'use server'
import { NextResponse } from "next/server";
import nodemailer from "nodemailer";
import { PDFDocument, StandardFonts, rgb } from "pdf-lib";
import fetch from "node-fetch";

export async function SendReportAction(email, insights) {

  const pdfDoc = await PDFDocument.create();
  const font = await pdfDoc.embedFont(StandardFonts.Helvetica);

  // === PAGE 1 === Textual Report ===
  let page = pdfDoc.addPage([600, 800]);
  const fontSize = 12;
  let y = 750;

  const drawHeader = (text) => {
    page.drawText(text, {
      x: 50,
      y,
      size: 18,
      font,
      color: rgb(0.1, 0.1, 0.7),
    });
    y -= 30;
  };

  const drawSubHeader = (text) => {
    page.drawText(text, {
      x: 50,
      y,
      size: 14,
      font,
      color: rgb(0, 0.2, 0.5),
    });
    y -= 22;
  };

  const drawText = (text) => {
    page.drawText(text, {
      x: 60,
      y,
      size: fontSize,
      font,
      color: rgb(0, 0, 0),
    });
    y -= 18;
  };

  drawHeader("BumbleBee AI - Career Market Insights Report");

  drawSubHeader("Overview");
  drawText(`Market Outlook: ${insights.marketOutlook}`);
  drawText(`Growth Rate: ${insights.growthRate}%`);
  drawText(`Demand Level: ${insights.demandLevel}`);
  drawText(`Top Skills: ${insights.topSkills.join(", ")}`);
  y -= 10;

  drawSubHeader("Salary Ranges");
  insights.salaryRanges.forEach((range) => {
    drawText(
      `${range.role}: $${range.min} - $${range.max} (Median: $${range.median})`
    );
  });
  y -= 10;

  drawSubHeader("Key Trends");
  insights.keyTrends.forEach((trend) => drawText(`- ${trend}`));
  y -= 10;

  drawSubHeader("Recommended Skills");
  insights.recommendedSkills.forEach((skill) => drawText(`- ${skill}`));
  y -= 30;

  drawSubHeader("Final Thoughts");
  drawText(
    "This report is generated to help you make data-driven career decisions."
  );
  drawText(
    "Explore the in-demand skills, align with market trends, and aim for roles with solid growth."
  );
  drawText("You've got this!");
  y -= 30;

  // === CHART HELPERS ===
  async function fetchChartImage(chartConfig) {
    const chartUrl = `https://quickchart.io/chart?c=${encodeURIComponent(JSON.stringify(chartConfig))}`;
    const response = await fetch(chartUrl);
    return await response.arrayBuffer();
  }

  function scaleImage(image, maxWidth = 500) {
    const scale = maxWidth / image.width;
    return image.scale(scale);
  }

  // === PAGE 2 === Bar Chart ===
  const barChartConfig = {
    type: "bar",
    data: {
      labels: insights.salaryRanges.map((r) => r.role),
      datasets: [
        {
          label: "Median Salary",
          data: insights.salaryRanges.map((r) => r.median),
          backgroundColor: "rgba(54, 162, 235, 0.6)",
        },
      ],
    },
    options: {
      title: { display: true, text: "Median Salaries by Role" },
      plugins: { legend: { display: false } },
    },
  };

  const barChartBytes = await fetchChartImage(barChartConfig);
  const barChartImage = await pdfDoc.embedPng(barChartBytes);
  const barDims = scaleImage(barChartImage);

  const chartPage = pdfDoc.addPage([600, 800]);
  chartPage.drawText("Chart: Median Salaries by Role", {
    x: 50,
    y: 750,
    size: 16,
    font,
    color: rgb(0.1, 0.1, 0.7),
  });
  chartPage.drawImage(barChartImage, {
    x: 50,
    y: 300,
    width: barDims.width,
    height: barDims.height,
  });

  // === PAGE 3 === Pie Chart ===
  const demandWeights = {
    "Software Engineer": 20,
    "Data Scientist": 25,
    "Frontend Developer": 15,
    "Backend Developer": 20,
    "DevOps Engineer": 10,
    "Mobile App Developer": 10,
  };

  const pieChartConfig = {
    type: "pie",
    data: {
      labels: Object.keys(demandWeights),
      datasets: [
        {
          data: Object.values(demandWeights),
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
    options: {
      title: { display: true, text: "Estimated Demand Distribution" },
    },
  };

  const pieChartBytes = await fetchChartImage(pieChartConfig);
  const pieChartImage = await pdfDoc.embedPng(pieChartBytes);
  const pieDims = scaleImage(pieChartImage);

  const piePage = pdfDoc.addPage([600, 800]);
  piePage.drawText("Chart: Estimated Demand Distribution", {
    x: 50,
    y: 750,
    size: 16,
    font,
    color: rgb(0.1, 0.1, 0.7),
  });
  piePage.drawImage(pieChartImage, {
    x: 50,
    y: 300,
    width: pieDims.width,
    height: pieDims.height,
  });

  drawText("Best regards,");
  drawText("The BumbleBee AI Team");

  // === Export PDF ===
  const pdfBytes = await pdfDoc.save();

  // === Email via Nodemailer ===
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
      subject: "Your Career Market Insights Report (PDF Attached)",
      text: `Hi there,

Please find attached your personalized Career Market Insights Report powered by BumbleBee AI.

This report includes market trends, salary data, and recommended skills, along with insightful charts to guide your decisions.

Cheers,  
BumbleBee AI Team`,
      attachments: [
        {
          filename: "career-market-report.pdf",
          content: Buffer.from(pdfBytes),
          contentType: "application/pdf",
        },
      ],
    });

    return { status: "sent" };
  } catch (err) {
    console.error("Email error:", err);
    return 
      { error: "Failed to send email" }
  }
}
