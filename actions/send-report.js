/*eslint-disable quotes */

"use server";
import nodemailer from "nodemailer";
import { PDFDocument, StandardFonts, rgb } from "pdf-lib";
import fetch from "node-fetch";

export async function SendReportAction(email, insights) {
  const pdfDoc = await PDFDocument.create();
  const font = await pdfDoc.embedFont(StandardFonts.Helvetica);
  const boldFont = await pdfDoc.embedFont(StandardFonts.HelveticaBold);

  // === HELPERS ===
  function drawBanner(page, text, color, y = 760) {
    page.drawRectangle({
      x: 0,
      y: y - 40,
      width: page.getWidth(),
      height: 40,
      color,
    });
    const textWidth = boldFont.widthOfTextAtSize(text, 20);
    page.drawText(text, {
      x: (page.getWidth() - textWidth) / 2,
      y: y - 28,
      size: 20,
      font: boldFont,
      color: rgb(1, 1, 1),
    });
    return y - 70;
  }

  function drawSectionHeader(page, text, y) {
    y -= 15;
    page.drawRectangle({
      x: 50,
      y: y - 18,
      width: 500,
      height: 20,
      color: rgb(0.95, 0.95, 0.98),
    });
    page.drawText(text, {
      x: 60,
      y: y - 12,
      size: 13,
      font: boldFont,
      color: rgb(0.1, 0.2, 0.6),
    });
    return y - 35;
  }

  function drawText(page, text, y, size = 11, indent = 60) {
    page.drawText(text, {
      x: indent,
      y,
      size,
      font,
      color: rgb(0, 0, 0),
    });
    return y - 14;
  }

  function drawTwoColumnList(page, items, y, colX1 = 60, colX2 = 300) {
    items.forEach((item, i) => {
      const x = i % 2 === 0 ? colX1 : colX2;
      page.drawText(`- ${item}`, {
        x,
        y,
        size: 11,
        font,
      });
      if (i % 2 === 1) y -= 14;
    });
    return y - 20;
  }

  function drawTable(page, headers, rows, y) {
    const rowHeight = 20;
    const colWidths = headers.map(() => 500 / headers.length);
    let x = 50;

    // Header background
    page.drawRectangle({
      x,
      y: y - 14,
      width: colWidths.reduce((a, b) => a + b, 0),
      height: 18,
      color: rgb(0.9, 0.9, 1),
    });

    headers.forEach((h, i) => {
      page.drawText(h, {
        x: x + 5,
        y: y - 10,
        size: 10,
        font: boldFont,
      });
      x += colWidths[i];
    });
    y -= rowHeight;

    // Rows
    rows.forEach((row, rowIndex) => {
      x = 50;
      if (rowIndex % 2 === 0) {
        page.drawRectangle({
          x,
          y: y - 14,
          width: colWidths.reduce((a, b) => a + b, 0),
          height: 18,
          color: rgb(0.98, 0.98, 0.98),
        });
      }
      row.forEach((cell, i) => {
        page.drawText(String(cell), {
          x: x + 5,
          y: y - 10,
          size: 10,
          font,
        });
        x += colWidths[i];
      });
      y -= rowHeight;
    });

    return y - 15;
  }

  async function fetchChartImage(chartConfig) {
    const chartUrl = `https://quickchart.io/chart?c=${encodeURIComponent(
      JSON.stringify(chartConfig),
    )}`;
    const response = await fetch(chartUrl);
    return await response.arrayBuffer();
  }

  function scaleImage(image, maxWidth = 450) {
    const scale = maxWidth / image.width;
    return image.scale(scale);
  }

  function drawFooter(page, pageNum, totalPages) {
    page.drawText(`Page ${pageNum} of ${totalPages} | BumbleBee AI`, {
      x: 220,
      y: 20,
      size: 10,
      font,
      color: rgb(0.4, 0.4, 0.4),
    });
  }

  // === COVER PAGE ===
  const cover = pdfDoc.addPage([600, 800]);
  let y = drawBanner(
    cover,
    "BumbleBee Industry Insights Report",
    rgb(0.95, 0.7, 0.1),
  );
  cover.drawText("Hospitality & Tourism Sector", {
    x: 170,
    y,
    size: 16,
    font,
    color: rgb(0.2, 0.2, 0.2),
  });
  y -= 25;
  cover.drawText(`Last Updated: ${insights.lastUpdated}`, {
    x: 170,
    y,
    size: 12,
    font,
    color: rgb(0.3, 0.3, 0.3),
  });
  cover.drawText("Powered by BumbleBee AI", {
    x: 200,
    y: 100,
    size: 12,
    font,
    color: rgb(0.4, 0.4, 0.4),
  });

  // === PAGE 2: MARKET OVERVIEW + TOP SKILLS ===
  let page = pdfDoc.addPage([600, 800]);
  y = drawBanner(page, "Market Overview", rgb(0.1, 0.3, 0.6));
  y = drawText(page, `Market Outlook: ${insights.marketOutlook}`, y);
  y = drawText(page, `Industry Growth: ${insights.growthRate}%`, y);
  y = drawText(page, `Demand Level: ${insights.demandLevel}`, y);

  y = drawSectionHeader(page, "Top Skills", y);
  y = drawTwoColumnList(page, insights.topSkills, y);

  // === PAGE 3: SALARY RANGES (Table + Chart) ===
  page = pdfDoc.addPage([600, 800]);
  y = drawBanner(page, "Salary Ranges by Role", rgb(0.2, 0.5, 0.8));
  const salaryRows = insights.salaryRanges.map((r) => [
    r.role,
    `$${r.min}`,
    `$${r.median}`,
    `$${r.max}`,
  ]);
  y = drawTable(page, ["Role", "Min", "Median", "Max"], salaryRows, y);

  // Bar chart
  const barChartConfig = {
    type: "bar",
    data: {
      labels: insights.salaryRanges.map((r) => r.role),
      datasets: [
        {
          label: "Median Salary",
          data: insights.salaryRanges.map((r) => r.median),
          backgroundColor: "rgba(54, 162, 235, 0.7)",
        },
      ],
    },
  };
  const barChartBytes = await fetchChartImage(barChartConfig);
  const barChartImage = await pdfDoc.embedPng(barChartBytes);
  const barDims = scaleImage(barChartImage);
  page.drawImage(barChartImage, {
    x: 75,
    y: y - barDims.height - 20,
    width: barDims.width,
    height: barDims.height,
  });

  // === PAGE 4: COMPANIES + TRENDS ===
  page = pdfDoc.addPage([600, 800]);
  y = drawBanner(page, "Top Paying Companies", rgb(0.6, 0.4, 0.1));
  const companyRows = insights.topCompanies.map((c) => [
    c.company,
    c.role,
    c.experience,
    `$${c.salary}`,
  ]);
  y = drawTable(
    page,
    ["Company", "Role", "Experience", "Salary"],
    companyRows,
    y,
  );

  y = drawSectionHeader(page, "Key Industry Trends", y);
  y = drawTwoColumnList(page, insights.keyTrends, y);

  // === PAGE 5: SKILLS + JOB OPENINGS ===
  page = pdfDoc.addPage([600, 800]);
  y = drawBanner(page, "Skills & Opportunities", rgb(0.3, 0.2, 0.5));

  y = drawSectionHeader(page, "Recommended Skills", y);
  y = drawTwoColumnList(page, insights.recommendedSkills, y);

  y = drawSectionHeader(page, "Job Openings by Country", y);
  const openingsRows = insights.jobOpenings.map((o) => [o.country, o.openings]);
  y = drawTable(page, ["Country", "Openings"], openingsRows, y);

  const openingsChartConfig = {
    type: "pie",
    data: {
      labels: insights.jobOpenings.map((o) => o.country),
      datasets: [
        {
          data: insights.jobOpenings.map((o) => o.openings),
          backgroundColor: [
            "#FF6384",
            "#36A2EB",
            "#FFCE56",
            "#4BC0C0",
            "#9966FF",
            "#F7464A",
          ],
        },
      ],
    },
  };
  const openingsChartBytes = await fetchChartImage(openingsChartConfig);
  const openingsChartImage = await pdfDoc.embedPng(openingsChartBytes);
  const openingsDims = scaleImage(openingsChartImage);
  page.drawImage(openingsChartImage, {
    x: 75,
    y: y - openingsDims.height - 20,
    width: openingsDims.width,
    height: openingsDims.height,
  });

  // === PAGE 6: FINAL THOUGHTS ===
  const finalPage = pdfDoc.addPage([600, 800]);
  y = drawBanner(finalPage, "Your Next Step Awaits", rgb(0.8, 0.3, 0.2));
  finalPage.drawText('"The best way to predict the future is to create it."', {
    x: 80,
    y: 400,
    size: 16,
    font: boldFont,
    color: rgb(0.1, 0.1, 0.1),
  });
  drawText(finalPage, "- Peter Drucker", 370, 12, 300);

  // === FOOTERS WITH PAGE NUMBERS ===
  const totalPages = pdfDoc.getPages().length;
  pdfDoc.getPages().forEach((p, idx) => {
    drawFooter(p, idx + 1, totalPages);
  });

  // === EXPORT PDF ===
  const pdfBytes = await pdfDoc.save();

  // === EMAIL ===
  const transporter = nodemailer.createTransport({
    service: "gmail",
    auth: {
      user: process.env.GMAIL_USER,
      pass: process.env.GMAIL_PASS,
    },
  });

  try {
    await transporter.sendMail({
      from: `"BumbleBee AI - Career Coach" <${process.env.GMAIL_USER}>`,
      to: email,
      subject: "Your Industry Insights Report (PDF Attached)",
      text: `Hi there,

Please find attached your personalized Industry Insights Report powered by BumbleBee AI.

This report includes market trends, salary data, top companies, and recommended skills, along with insightful charts to guide your decisions.

Cheers,  
BumbleBee AI Team`,
      attachments: [
        {
          filename: "industry-insights-report.pdf",
          content: Buffer.from(pdfBytes),
          contentType: "application/pdf",
        },
      ],
    });

    return { status: "sent" };
  } catch (err) {
    console.error("Email error:", err);
    return { error: "Failed to send email" };
  }
}
