/*eslint-disable quotes */

import { PDFDocument, rgb, StandardFonts } from "pdf-lib";

export async function generatePDFBuffer(insights) {
  const doc = await PDFDocument.create();
  const page = doc.addPage([600, 800]);
  const font = await doc.embedFont(StandardFonts.Helvetica);

  let y = 780;
  const drawLine = (text, size = 12) => {
    page.drawText(text, { x: 50, y, size, font, color: rgb(0, 0, 0) });
    y -= 20;
  };

  drawLine(`Industry Insights Report`, 18);
  drawLine(`Market Outlook: ${insights.marketOutlook}`);
  drawLine(`Growth Rate: ${insights.growthRate}%`);
  drawLine(`Demand Level: ${insights.demandLevel}`);
  drawLine(``);
  drawLine(`Top Skills:`);
  insights.topSkills.forEach((skill) => drawLine(`- ${skill}`));
  drawLine(``);
  drawLine(`Key Trends:`);
  insights.keyTrends.forEach((trend) => drawLine(`- ${trend}`));
  drawLine(``);
  drawLine(`Salary Ranges:`);
  insights.salaryRanges.forEach((role) => {
    drawLine(
      `${role.role} (${role.location}): $${role.min} - $${role.max} (Median: $${role.median})`,
    );
  });

  const pdfBytes = await doc.save();
  return Buffer.from(pdfBytes);
}
