"use server";

import nodemailer from "nodemailer";

export async function sendContactEmail(data) {
  const { firstName, lastName, email, phone, question } = data;

  try {
    const transporter = nodemailer.createTransport({
      service: "gmail",
      auth: {
        user: process.env.GMAIL_USER, // Gmail
        pass: process.env.GMAIL_PASS, // App password
      },
    });

    await transporter.sendMail({
      from: `"${firstName} ${lastName}" <${email}>`,
      to: "kruthikmanubolu@gmail.com",
      subject: "New Contact Form Submission",
      text: `
        Name: ${firstName} ${lastName}
        Email: ${email}
        Phone: ${phone}
        Question: ${question}
      `,
    });

    return { success: true, message: "Email sent successfully" };
  } catch (error) {
    console.error("❌ Email send error:", error);
    return { success: false, message: "Failed to send email" };
  }
}
