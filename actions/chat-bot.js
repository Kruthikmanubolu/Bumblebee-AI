"use server";

import { GoogleGenerativeAI } from "@google/generative-ai";

async function safeGenerateContent(model, prompt, retries = 3) {
  for (let i = 0; i < retries; i++) {
    try {
      return await model.generateContent(prompt);
    } catch (error) {
      console.warn(`Retrying Gemini API... Attempt ${i + 1}`);
      if (i === retries - 1) throw error;
      await new Promise((res) => setTimeout(res, 1000 * (i + 1))); // backoff
    }
  }
}

export async function chatAction(message) {
  try {
    const lowerMsg = message.toLowerCase();
    const isSchedulingRequest =
      lowerMsg.includes("schedule") ||
      lowerMsg.includes("book a meeting") ||
      lowerMsg.includes("set up a call") ||
      lowerMsg.includes("meeting");

    if (isSchedulingRequest) {
      return {
        reply: "Please choose a time below 👇",
        type: "calendly",
        url: "https://calendly.com/kruthikmanubolu/30min",
      };
    }

    const genAI = new GoogleGenerativeAI(process.env.GEMINI_API_KEY);
    const model = genAI.getGenerativeModel({ model: "gemini-2.5-flash" });

    const prompt = `
You are an AI assistant for a career guidance platform.
1. Answer clearly and concisely.
2. Only respond to career-related queries.
3. Make sure to remember the conversations.
4. If the user asks to contact an expert, reply:
"Sure! You can reach our expert at:
Email: kruthikmanubolu@gmail.com
Phone: +1-458-272-4928"

User's Question: "${message}"
`;

    const result = await safeGenerateContent(model, prompt);
    const reply = result.response.text().trim();

    return { reply };
  } catch (error) {
    console.error("Chat Action Error:", error);
    return {
      reply:
        "Our AI assistant is currently busy. Please try again later or contact us directly at kruthikmanubolu@gmail.com.",
    };
  }
}
