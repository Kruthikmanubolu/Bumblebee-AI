/*eslint-disable quotes */

"use server";
import nodemailer from "nodemailer";
import { PDFDocument, StandardFonts, rgb } from "pdf-lib";
import fetch from "node-fetch";
import { getUserProfile } from "./user";

export async function SendReportAction(email, insights) {
  const user = await getUserProfile();
  console.log(user);
  const pdfDoc = await PDFDocument.create();

  // Enhanced font embedding
  const regularFont = await pdfDoc.embedFont(StandardFonts.Helvetica);
  const boldFont = await pdfDoc.embedFont(StandardFonts.HelveticaBold);
  const lightFont = await pdfDoc.embedFont(StandardFonts.HelveticaOblique);

  // Professional color palette
  const colors = {
    primary: rgb(0.067, 0.184, 0.341), // Deep navy
    secondary: rgb(0.949, 0.725, 0.098), // Gold
    accent: rgb(0.235, 0.525, 0.765), // Professional blue
    success: rgb(0.196, 0.643, 0.31), // Green
    warning: rgb(0.886, 0.525, 0.149), // Orange
    text: rgb(0.133, 0.133, 0.133), // Dark gray
    lightText: rgb(0.467, 0.467, 0.467), // Medium gray
    background: rgb(0.976, 0.976, 0.976), // Light background
    white: rgb(1, 1, 1),
  };

  // === ENHANCED HELPERS ===
  function drawProfessionalBanner(page, title, subtitle, color, y = 750) {
    const pageWidth = page.getWidth();

    // Main banner rectangle with gradient effect
    page.drawRectangle({
      x: 0,
      y: y - 60,
      width: pageWidth,
      height: 60,
      color,
    });

    // Accent line
    page.drawRectangle({
      x: 0,
      y: y - 65,
      width: pageWidth,
      height: 3,
      color: colors.secondary,
    });

    // Title
    const titleWidth = boldFont.widthOfTextAtSize(title, 24);
    page.drawText(title, {
      x: (pageWidth - titleWidth) / 2,
      y: y - 30,
      size: 24,
      font: boldFont,
      color: colors.white,
    });

    // Subtitle if provided
    if (subtitle) {
      const subtitleWidth = regularFont.widthOfTextAtSize(subtitle, 14);
      page.drawText(subtitle, {
        x: (pageWidth - subtitleWidth) / 2,
        y: y - 48,
        size: 14,
        font: regularFont,
        color: colors.white,
      });
    }

    return y - 90;
  }

  function drawSectionHeader(page, text, y, icon = "■") {
    y -= 20;

    // Section background
    page.drawRectangle({
      x: 40,
      y: y - 25,
      width: 520,
      height: 28,
      color: colors.background,
    });

    // Left accent line
    page.drawRectangle({
      x: 40,
      y: y - 25,
      width: 4,
      height: 28,
      color: colors.primary,
    });

    // Icon/bullet
    page.drawText(icon, {
      x: 55,
      y: y - 15,
      size: 16,
      font: boldFont,
      color: colors.primary,
    });

    // Section title
    page.drawText(text, {
      x: 75,
      y: y - 15,
      size: 16,
      font: boldFont,
      color: colors.primary,
    });

    return y - 40;
  }

  function drawBodyText(page, text, y, options = {}) {
    const {
      size = 12,
      indent = 60,
      font = regularFont,
      color = colors.text,
      lineHeight = 16,
      maxWidth = 480,
    } = options;

    // Ensure text is a string
    const textStr = String(text);

    // Word wrapping for long text
    const words = textStr.split(" ");
    let lines = [];
    let currentLine = "";

    for (const word of words) {
      const testLine = currentLine + (currentLine ? " " : "") + word;
      const testWidth = font.widthOfTextAtSize(testLine, size);

      if (testWidth > maxWidth && currentLine) {
        lines.push(currentLine);
        currentLine = word;
      } else {
        currentLine = testLine;
      }
    }
    if (currentLine) lines.push(currentLine);

    // Draw lines
    for (const line of lines) {
      page.drawText(line, {
        x: indent,
        y,
        size,
        font,
        color,
      });
      y -= lineHeight;
    }

    return y - 10;
  }

  function drawKeyValuePair(page, key, value, y, keyWidth = 120) {
    // Ensure all values are strings
    const keyStr = String(key);
    const valueStr = String(value);

    // Key
    page.drawText(keyStr + ":", {
      x: 60,
      y,
      size: 12,
      font: boldFont,
      color: colors.text,
    });

    // Value
    page.drawText(valueStr, {
      x: 60 + keyWidth,
      y,
      size: 12,
      font: regularFont,
      color: colors.text,
    });

    return y - 18;
  }

  function drawProfessionalList(page, items, y, columns = 2) {
    const itemsPerColumn = Math.ceil(items.length / columns);
    const colWidth = 240;

    items.forEach((item, i) => {
      const col = Math.floor(i / itemsPerColumn);
      const row = i % itemsPerColumn;
      const x = 60 + col * colWidth;
      const itemY = y - row * 18;

      // Bullet point
      page.drawText("•", {
        x: x,
        y: itemY,
        size: 14,
        font: boldFont,
        color: colors.primary,
      });

      // Item text
      page.drawText(item, {
        x: x + 15,
        y: itemY,
        size: 11,
        font: regularFont,
        color: colors.text,
      });
    });

    return y - itemsPerColumn * 18 - 20;
  }

  function drawProfessionalTable(page, headers, rows, y, options = {}) {
    const {
      headerColor = colors.primary,
      alternateRows = true,
      cellPadding = 8,
    } = options;

    const tableWidth = 500;
    const colWidths = headers.map(() => tableWidth / headers.length);
    const rowHeight = 24;
    let currentY = y;

    // Table border
    page.drawRectangle({
      x: 50,
      y: currentY - (rows.length + 1) * rowHeight - 5,
      width: tableWidth,
      height: (rows.length + 1) * rowHeight + 5,
      color: colors.white,
    });

    // Header
    page.drawRectangle({
      x: 50,
      y: currentY - rowHeight,
      width: tableWidth,
      height: rowHeight,
      color: headerColor,
    });

    let x = 50;
    headers.forEach((header, i) => {
      page.drawText(header, {
        x: x + cellPadding,
        y: currentY - 16,
        size: 12,
        font: boldFont,
        color: colors.white,
      });
      x += colWidths[i];
    });

    currentY -= rowHeight;

    // Data rows
    rows.forEach((row, rowIndex) => {
      if (alternateRows && rowIndex % 2 === 0) {
        page.drawRectangle({
          x: 50,
          y: currentY - rowHeight,
          width: tableWidth,
          height: rowHeight,
          color: colors.background,
        });
      }

      x = 50;
      row.forEach((cell, i) => {
        page.drawText(String(cell), {
          x: x + cellPadding,
          y: currentY - 16,
          size: 11,
          font: regularFont,
          color: colors.text,
        });
        x += colWidths[i];
      });
      currentY -= rowHeight;
    });

    return currentY - 20;
  }

  function drawStatCard(page, label, value, x, y, width = 120, height = 60) {
    // Ensure value is a string
    const valueStr = String(value);
    const labelStr = String(label);

    // Card background
    page.drawRectangle({
      x,
      y: y - height,
      width,
      height,
      color: colors.white,
    });

    // Card border
    page.drawRectangle({
      x,
      y: y - height,
      width,
      height,
      color: colors.primary,
    });
    page.drawRectangle({
      x: x + 1,
      y: y - height + 1,
      width: width - 2,
      height: height - 2,
      color: colors.white,
    });

    // Accent line
    page.drawRectangle({
      x,
      y: y - 5,
      width,
      height: 3,
      color: colors.secondary,
    });

    // Value
    const valueWidth = boldFont.widthOfTextAtSize(valueStr, 18);
    page.drawText(valueStr, {
      x: x + (width - valueWidth) / 2,
      y: y - 25,
      size: 18,
      font: boldFont,
      color: colors.primary,
    });

    // Label
    const labelWidth = regularFont.widthOfTextAtSize(labelStr, 10);
    page.drawText(labelStr, {
      x: x + (width - labelWidth) / 2,
      y: y - 45,
      size: 10,
      font: regularFont,
      color: colors.lightText,
    });
  }

  async function fetchEnhancedChart(chartConfig) {
    const enhancedConfig = {
      ...chartConfig,
      options: {
        ...chartConfig.options,
        responsive: true,
        plugins: {
          legend: {
            position: "bottom",
            labels: {
              font: {
                family: "Helvetica",
                size: 12,
              },
            },
          },
        },
      },
    };

    const chartUrl = `https://quickchart.io/chart?c=${encodeURIComponent(
      JSON.stringify(enhancedConfig),
    )}`;
    const response = await fetch(chartUrl);
    return await response.arrayBuffer();
  }

  function drawProfessionalFooter(page, pageNum, totalPages) {
    const pageWidth = page.getWidth();

    // Footer line
    page.drawRectangle({
      x: 50,
      y: 35,
      width: pageWidth - 100,
      height: 1,
      color: colors.lightText,
    });

    // Page number
    page.drawText(`Page ${pageNum} of ${totalPages}`, {
      x: 50,
      y: 20,
      size: 10,
      font: regularFont,
      color: colors.lightText,
    });

    // Company branding
    const brandText = "BumbleBee AI - Professional Career Intelligence";
    const brandWidth = regularFont.widthOfTextAtSize(brandText, 10);
    page.drawText(brandText, {
      x: pageWidth - brandWidth - 50,
      y: 20,
      size: 10,
      font: regularFont,
      color: colors.lightText,
    });
  }

  // === PROFESSIONAL COVER PAGE ===
  const cover = pdfDoc.addPage([612, 792]); // Standard letter size

  // Cover banner
  let y = drawProfessionalBanner(
    cover,
    "Industry Insights Report",
    `${user.industry}`,
    colors.primary,
    720,
  );

  // Executive summary box
  cover.drawRectangle({
    x: 80,
    y: y - 180,
    width: 452,
    height: 160,
    color: colors.background,
  });

  y -= 20;
  y = drawBodyText(cover, "Executive Summary", y, {
    size: 16,
    font: boldFont,
    color: colors.primary,
    indent: 100,
  });

  y = drawBodyText(
    cover,
    `This comprehensive report provides strategic insights into the ${user.industry} sector, featuring market analysis, salary benchmarks, industry trends, and actionable recommendations for career advancement.`,
    y,
    {
      indent: 100,
      maxWidth: 412,
    },
  );

  // Key metrics cards
  y -= 40;
  drawStatCard(
    cover,
    "Market Growth",
    `${insights.growthRate || "N/A"}%`,
    100,
    y,
  );
  drawStatCard(cover, "Demand Level", insights.demandLevel || "N/A", 240, y);
  drawStatCard(
    cover,
    "Total Roles",
    String(insights.salaryRanges?.length || 0),
    380,
    y,
  );

  // Date and branding
  y -= 100;
  y = drawKeyValuePair(
    cover,
    "Report Date",
    new Date().toLocaleDateString(),
    y,
  );
  y = drawKeyValuePair(
    cover,
    "Prepared By",
    "BumbleBee AI Career Intelligence",
    y,
  );
  y = drawKeyValuePair(cover, "Industry Focus", `${user.industry}`, y);

  // === PAGE 2: MARKET OVERVIEW ===
  let page = pdfDoc.addPage([612, 792]);
  y = drawProfessionalBanner(page, "Market Overview", null, colors.primary);

  // Market metrics in cards
  drawStatCard(
    page,
    "Growth Rate",
    `${insights.growthRate || "N/A"}%`,
    80,
    y + 20,
    140,
    70,
  );
  drawStatCard(
    page,
    "Market Outlook",
    insights.marketOutlook || "N/A",
    240,
    y + 20,
    140,
    70,
  );
  drawStatCard(
    page,
    "Demand Level",
    insights.demandLevel || "N/A",
    400,
    y + 20,
    140,
    70,
  );

  y -= 100;
  y = drawSectionHeader(page, "Industry Highlights", y, ">>");

  const highlights = [
    `Strong ${insights.growthRate || "N/A"}% growth trajectory indicates robust market expansion`,
    `${insights.demandLevel || "N/A"} demand level creates favorable employment conditions`,
    `Market outlook remains ${(insights.marketOutlook || "positive").toLowerCase()} for upcoming quarters`,
    "Digital transformation driving new skill requirements across the sector",
  ];

  y = drawProfessionalList(page, highlights, y, 1);

  y = drawSectionHeader(page, "Top In-Demand Skills", y, "*");
  y = drawProfessionalList(page, insights.topSkills, y);

  // === PAGE 3: SALARY ANALYSIS ===
  page = pdfDoc.addPage([612, 792]);
  y = drawProfessionalBanner(
    page,
    "Salary Analysis",
    "Compensation Benchmarks by Role",
    colors.accent,
  );

  const salaryRows =
    insights.salaryRanges?.map((r) => [
      String(r.role || ""),
      `${(r.min || 0).toLocaleString()}`,
      `${(r.median || 0).toLocaleString()}`,
      `${(r.max || 0).toLocaleString()}`,
    ]) || [];

  y = drawProfessionalTable(
    page,
    ["Role", "Minimum", "Median", "Maximum"],
    salaryRows,
    y,
    {
      headerColor: colors.accent,
    },
  );

  // Enhanced salary chart
  const salaryChartConfig = {
    type: "horizontalBar",
    data: {
      labels: insights.salaryRanges.map((r) =>
        r.role.length > 20 ? r.role.substring(0, 17) + "..." : r.role,
      ),
      datasets: [
        {
          label: "Salary Range",
          data: insights.salaryRanges.map((r) => [r.min, r.max]),
          backgroundColor: "rgba(60, 134, 197, 0.7)",
          borderColor: "rgba(60, 134, 197, 1)",
          borderWidth: 1,
        },
        {
          label: "Median Salary",
          data: insights.salaryRanges.map((r) => r.median),
          backgroundColor: "rgba(242, 185, 25, 0.8)",
          borderColor: "rgba(242, 185, 25, 1)",
          borderWidth: 2,
          type: "scatter",
        },
      ],
    },
    options: {
      scales: {
        x: {
          title: {
            display: true,
            text: "Salary ($)",
          },
        },
      },
    },
  };

  try {
    const salaryChartBytes = await fetchEnhancedChart(salaryChartConfig);
    const salaryChartImage = await pdfDoc.embedPng(salaryChartBytes);
    const chartHeight = 200;
    const chartWidth = 450;

    page.drawImage(salaryChartImage, {
      x: 80,
      y: y - chartHeight - 20,
      width: chartWidth,
      height: chartHeight,
    });
  } catch (error) {
    console.error("Chart generation error:", error);
    drawBodyText(
      page,
      "Chart unavailable - data processing in progress",
      y - 50,
      {
        color: colors.lightText,
        indent: 80,
      },
    );
  }

  // === PAGE 4: TOP COMPANIES ===
  page = pdfDoc.addPage([612, 792]);
  y = drawProfessionalBanner(
    page,
    "Top Employers",
    "Leading Companies & Opportunities",
    colors.success,
  );

  const companyRows =
    insights.topCompanies?.map((c) => [
      String(c.company || ""),
      String(c.role || ""),
      String(c.experience || ""),
      `${(c.salary || 0).toLocaleString()}`,
    ]) || [];

  y = drawProfessionalTable(
    page,
    ["Company", "Role", "Experience", "Salary"],
    companyRows,
    y,
    {
      headerColor: colors.success,
    },
  );

  y = drawSectionHeader(page, "Key Industry Trends", y, "#");
  y = drawProfessionalList(page, insights.keyTrends, y, 1);

  // === PAGE 5: SKILLS & OPPORTUNITIES ===
  page = pdfDoc.addPage([612, 792]);
  y = drawProfessionalBanner(
    page,
    "Skills & Opportunities",
    "Career Development Focus",
    colors.warning,
  );

  y = drawSectionHeader(
    page,
    "Recommended Skills for Career Advancement",
    y,
    "+",
  );
  y = drawProfessionalList(page, insights.recommendedSkills, y);

  y = drawSectionHeader(page, "Global Job Opportunities", y, "@");

  const openingsRows =
    insights.jobOpenings?.map((o) => [
      String(o.country || ""),
      (o.openings || 0).toLocaleString(),
      `${(((o.openings || 0) / (insights.jobOpenings?.reduce((sum, item) => sum + (item.openings || 0), 0) || 1)) * 100).toFixed(1)}%`,
    ]) || [];

  y = drawProfessionalTable(
    page,
    ["Country", "Open Positions", "Market Share"],
    openingsRows,
    y,
    {
      headerColor: colors.warning,
    },
  );

  // Global opportunities pie chart
  const opportunitiesChartConfig = {
    type: "doughnut",
    data: {
      labels: insights.jobOpenings.map((o) => o.country),
      datasets: [
        {
          data: insights.jobOpenings.map((o) => o.openings),
          backgroundColor: [
            "rgba(255, 99, 132, 0.8)",
            "rgba(54, 162, 235, 0.8)",
            "rgba(255, 206, 86, 0.8)",
            "rgba(75, 192, 192, 0.8)",
            "rgba(153, 102, 255, 0.8)",
            "rgba(255, 159, 64, 0.8)",
          ],
          borderWidth: 2,
          borderColor: "#fff",
        },
      ],
    },
    options: {
      cutout: "40%",
    },
  };

  // === PAGE 6: STRATEGIC RECOMMENDATIONS ===
  const finalPage = pdfDoc.addPage([612, 792]);
  y = drawProfessionalBanner(
    finalPage,
    "Motivational Quote",
    "Your Path to Success",
    colors.secondary,
  );

  // Key recommendations

  // Inspirational quote box
  y -= 40;
  finalPage.drawRectangle({
    x: 80,
    y: y - 85,
    width: 452,
    height: 80,
    color: colors.background,
  });

  finalPage.drawRectangle({
    x: 80,
    y: y - 5,
    width: 452,
    height: 3,
    color: colors.secondary,
  });

  const quote =
    '"Attitude is a choice. Happiness is a choice. Optimism is a choice. Kindness is a choice. Giving is a choice. Respect is a choice. Whatever choice you make makes you. Choose wisely."';
  const quoteWidth = lightFont.widthOfTextAtSize(quote, 14);
  const maxQuoteWidth = 400;

  // Word wrap the quote if needed
  if (quoteWidth > maxQuoteWidth) {
    drawBodyText(finalPage, quote, y - 25, {
      font: lightFont,
      size: 14,
      indent: 100,
      maxWidth: maxQuoteWidth,
      color: colors.primary,
    });
  } else {
    finalPage.drawText(quote, {
      x: 80 + (452 - quoteWidth) / 2,
      y: y - 35,
      size: 14,
      font: lightFont,
      color: colors.primary,
    });
  }

  finalPage.drawText("- BumbleBee AI Career Intelligence", {
    x: 350,
    y: y - 100,
    size: 12,
    font: regularFont,
    color: colors.lightText,
  });

  // === PROFESSIONAL FOOTERS ===
  const totalPages = pdfDoc.getPages().length;
  pdfDoc.getPages().forEach((p, idx) => {
    drawProfessionalFooter(p, idx + 1, totalPages);
  });

  // === EXPORT PDF ===
  const pdfBytes = await pdfDoc.save();

  // === ENHANCED EMAIL ===
  const transporter = nodemailer.createTransport({
    service: "gmail",
    auth: {
      user: process.env.GMAIL_USER,
      pass: process.env.GMAIL_PASS,
    },
  });

  try {
    await transporter.sendMail({
      from: `"BumbleBee AI - Professional Career Intelligence" <${process.env.GMAIL_USER}>`,
      to: email,
      subject: `Your Professional Industry Insights Report - ${user.industry}`,
      html: `
        <div style="font-family: 'Helvetica Neue', Arial, sans-serif; max-width: 600px; margin: 0 auto; color: #333;">
          <div style="background: linear-gradient(135deg, #1147574 0%, #3C86C5 100%); padding: 30px; text-align: center; color: white;">
            <h1 style="margin: 0; font-size: 24px;">Your Industry Insights Report is Ready</h1>
            <p style="margin: 10px 0 0; opacity: 0.9;">Professional Career Intelligence for ${user.industry}</p>
          </div>
          
          <div style="padding: 30px; background: #f8f9fa;">
            <p style="font-size: 16px; line-height: 1.6; margin-bottom: 20px;">
              Dear ${user.name},
            </p>
            
            <p style="line-height: 1.6; margin-bottom: 20px;">
              Your comprehensive Industry Insights Report for ${user.industry} has been generated and is attached to this email. This professional-grade analysis includes:
            </p>
            
            <ul style="line-height: 1.8; margin-bottom: 20px; padding-left: 20px;">
              <li><strong>Market Overview</strong> - Current trends and growth projections</li>
              <li><strong>Salary Benchmarks</strong> - Detailed compensation analysis by role</li>
              <li><strong>Top Employers</strong> - Leading companies and opportunities</li>
              <li><strong>Skills Intelligence</strong> - In-demand capabilities and recommendations</li>
              <li><strong>Global Opportunities</strong> - International job market insights</li>
              <li><strong>Motivational Quote</strong> - Actionable career advancement steps</li>
            </ul>
            
            <p style="line-height: 1.6; margin-bottom: 30px;">
              This report leverages advanced AI analytics to provide you with data-driven insights for strategic career planning in the ${user.industry} sector.
            </p>
            
            <div style="text-align: center; margin: 30px 0;">
              <div style="background: #fff; padding: 20px; border-left: 4px solid #F2B919; display: inline-block;">
                <p style="margin: 0; font-style: italic; color: #666;">
                  "Intelligence is the ability to adapt to change. Your career success depends on staying ahead of industry evolution."
                </p>
              </div>
            </div>
            
            <p style="line-height: 1.6;">
              Best regards,<br>
              <strong>The BumbleBee AI Team</strong><br>
              <em>Professional Career Intelligence</em>
            </p>
          </div>
          
          <div style="background: #333; color: white; padding: 20px; text-align: center; font-size: 12px;">
            <p style="margin: 0;">© 2024 BumbleBee AI - Empowering Career Success Through Intelligence</p>
          </div>
        </div>
      `,
      attachments: [
        {
          filename: `Industry-Insights-Report-${new Date().toISOString().split("T")[0]}.pdf`,
          content: Buffer.from(pdfBytes),
          contentType: "application/pdf",
        },
      ],
    });

    return {
      status: "sent",
      message: "Professional report delivered successfully",
    };
  } catch (err) {
    console.error("Email delivery error:", err);
    return {
      error: "Failed to deliver report",
      details: err.message,
    };
  }
}
