"use server";

import { db } from "@/lib/prisma";
import { auth } from "@clerk/nextjs/server";
import { GoogleGenerativeAI } from "@google/generative-ai";

const genAI = new GoogleGenerativeAI(process.env.GEMINI_API_KEY);
const model = genAI.getGenerativeModel({ model: "gemini-1.5-flash" });

export const generateAIInsights = async (industry) => {
  const prompt = `
Analyze the current state of the ${industry} industry and provide insights in ONLY the following JSON format without any additional notes or explanations:
{
  "salaryRanges": [
    { "role": "string", "min": number, "max": number, "median": number, "location": "string" }
  ],
  "growthRate": number,
  "demandLevel": "High" | "Medium" | "Low",
  "topSkills": ["skill1", "skill2", "skill3", "skill4", "skill5"],
  "marketOutlook": "Positive" | "Neutral" | "Negative",
  "keyTrends": ["trend1", "trend2", "trend3", "trend4", "trend5"],
  "recommendedSkills": ["skill1", "skill2", "skill3", "skill4", "skill5"],
  "topCompanies": [
    { "company": "string", "role": "string", "experienceLevel": "1 year" | "2 years" | "3 years" | "3+ years", "salary": number }
  ],
  "careerProgression": [
    {
      "role": "string",
      "path": [
        { "title": "string", "years": number, "description": "string", "icon": "🧑‍💻" }
      ]
    }
  ],
  "jobOpenings": [
    { "country": "string", "coordinates": [longitude, latitude], "openings": number }
  ]
}

IMPORTANT RULES:
- Return ONLY the JSON — no extra text, no markdown formatting.
- Include at least 5 common roles for salaryRanges.
- Include exactly 5 entries in topCompanies.
- For careerProgression:
    - Include one entry for each role from salaryRanges.
    - Each entry's "path" should have exactly 5 steps, ordered from entry-level to senior-level.
    - Use clear, realistic descriptions for each step.
- Growth rate should be a percentage number (e.g., 4.5).
- jobOpenings must include each and every country which have jobs in the ${industry}, with realistic coordinates and opening counts.
`;

  const result = await model.generateContent(prompt);
  const response = result.response;
  const text = response.text();
  console.log("Raw Gemini Response:\n", text);

  const cleanedText = text.replace(/```(?:json)?\n?/g, "").trim();

  return JSON.parse(cleanedText);
};

export async function getIndustryInsights() {
  const { userId } = await auth();
  if (!userId) throw new Error("Unauthorized");

  const user = await db.user.findUnique({
    where: { clerkUserId: userId },
    include: {
      industryInsight: true,
    },
  });

  if (!user) throw new Error("User not found");

  const existingInsight = user.industryInsight;

  const needsUpdate =
    !existingInsight ||
    !existingInsight.topCompanies || // if field is missing
    new Date(existingInsight.nextUpdate) < new Date(); // or outdated

  if (needsUpdate) {
    const insights = await generateAIInsights(user.industry);
    console.log("Generated new insights:", insights);

    if (existingInsight) {
      // Update existing insight
      const updatedInsight = await db.industryInsight.update({
        where: { id: existingInsight.id },
        data: {
          ...insights,
          lastUpdated: new Date(),
          nextUpdate: new Date(Date.now() + 7 * 24 * 60 * 60 * 1000),
        },
      });
      return updatedInsight;
    } else {
      // Create a new insight
      const newInsight = await db.industryInsight.create({
        data: {
          industry: user.industry,
          ...insights,
          nextUpdate: new Date(Date.now() + 7 * 24 * 60 * 60 * 1000),
        },
      });
      return newInsight;
    }
  }

  return existingInsight;
}
