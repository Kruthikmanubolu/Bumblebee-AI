"use server";

import { GoogleGenerativeAI } from "@google/generative-ai";

const genAI = new GoogleGenerativeAI(process.env.GEMINI_API_KEY);
const model = genAI.getGenerativeModel({ model: "gemini-1.5-flash" });

export const generateJobSearchComparisonOverYears = async () => {
  const prompt = `
Provide a year-by-year comparison (2015–2025) of job searching with AI assistance vs traditional job searching. 
Return ONLY a JSON object with this format (no extra notes, no markdown):

{
  "yearlyComparison": [
    {
      "year": number,
      "successRates": { "aiAssisted": number, "traditional": number },
      "timeToLandJobWeeks": { "aiAssisted": number, "traditional": number },
      "aiAdoptionLevel": "Low" | "Medium" | "High",
      "keyTrends": ["string1", "string2", "string3"]
    }
  ],
  "finalInsights": "string"
}

Rules:
- Include every year from 2015 to 2025 (inclusive).
- successRates should be percentages (approximate).
- timeToLandJobWeeks should be integers (realistic job search durations).
- aiAdoptionLevel should reflect actual adoption trends: Low (2015–2018), Medium (2019–2021), High (2022–2025).
- keyTrends must have exactly 3 trends per year.
- finalInsights should summarize overall evolution in 3–4 sentences.
`;

  const result = await model.generateContent(prompt);
  const response = result.response;
  const text = response.text();

  console.log("Raw Gemini Yearly Job Search Comparison:\n", text);

  const cleanedText = text.replace(/```(?:json)?\n?/g, "").trim();

  return JSON.parse(cleanedText);
};
