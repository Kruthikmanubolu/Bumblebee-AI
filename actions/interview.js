"use server";

import { db } from "@/lib/prisma";
import { auth } from "@clerk/nextjs/server";
import { GoogleGenerativeAI } from "@google/generative-ai";

const genAI = new GoogleGenerativeAI(process.env.GEMINI_API_KEY);
const model = genAI.getGenerativeModel({ model: "gemini-1.5-flash" });

export async function generateQuiz() {
  const { userId } = await auth();
  if (!userId) throw new Error("Unauthorized");

  const user = await db.user.findUnique({
    where: { clerkUserId: userId },
    select: {
      industry: true,
      skills: true,
    },
  });

  if (!user) throw new Error("User not found");

  const prompt = `
    Generate 10 technical interview questions for a ${
      user.industry
    } professional${
      user.skills?.length ? ` with expertise in ${user.skills.join(", ")}` : ""
    }.
    
    Each question should be multiple choice with 4 options.
    
    Return the response in this JSON format only, no additional text:
    {
      "questions": [
        {
          "question": "string",
          "options": ["string", "string", "string", "string"],
          "correctAnswer": "string",
          "explanation": "string"
        }
      ]
    }
  `;

  try {
    const result = await model.generateContent(prompt);
    const response = result.response;
    const text = response.text();
    const cleanedText = text.replace(/```(?:json)?\n?/g, "").trim();
    const quiz = JSON.parse(cleanedText);

    return quiz.questions;
  } catch (error) {
    console.error("Error generating quiz:", error);
    throw new Error("Failed to generate quiz questions");
  }
}

export async function saveQuizResult(questions, answers, score) {
  const { userId } = await auth();
  if (!userId) throw new Error("Unauthorized");

  const user = await db.user.findUnique({
    where: { clerkUserId: userId },
  });

  if (!user) throw new Error("User not found");

  const questionResults = questions.map((q, index) => ({
    question: q.question,
    answer: q.correctAnswer,
    userAnswer: answers[index],
    isCorrect: q.correctAnswer === answers[index],
    explanation: q.explanation,
  }));

  // Get wrong answers
  const wrongAnswers = questionResults.filter((q) => !q.isCorrect);

  // Only generate improvement tips if there are wrong answers
  let improvementTip = null;
  if (wrongAnswers.length > 0) {
    const wrongQuestionsText = wrongAnswers
      .map(
        (q, key) =>
          `Question: "${q.question}"\nCorrect Answer: "${q.answer}"\nUser Answer: "${q.userAnswer}"`,
      )
      .join("\n\n");

    const improvementPrompt = `
      The user got the following ${user.industry} technical interview questions wrong:

      ${wrongQuestionsText}

      Based on these mistakes, provide a concise, specific improvement tip.
      Focus on the knowledge gaps revealed by these wrong answers.
      Keep the response under 2 sentences and make it encouraging.
      Don't explicitly mention the mistakes, instead focus on what to learn/practice.
    `;

    try {
      const tipResult = await model.generateContent(improvementPrompt);

      improvementTip = tipResult.response.text().trim();
      console.log(improvementTip);
    } catch (error) {
      console.error("Error generating improvement tip:", error);
      // Continue without improvement tip if generation fails
    }
  }

  try {
    const assessment = await db.assessment.create({
      data: {
        userId: user.id,
        quizScore: score,
        questions: questionResults,
        category: "Technical",
        improvementTip,
      },
    });

    return assessment;
  } catch (error) {
    console.error("Error saving quiz result:", error);
    throw new Error("Failed to save quiz result");
  }
}

export async function getAssessments() {
  const { userId } = await auth();
  if (!userId) throw new Error("Unauthorized");

  const user = await db.user.findUnique({
    where: { clerkUserId: userId },
  });

  if (!user) throw new Error("User not found");

  try {
    const assessments = await db.assessment.findMany({
      where: {
        userId: user.id,
      },
      orderBy: {
        createdAt: "asc",
      },
    });

    return assessments;
  } catch (error) {
    console.error("Error fetching assessments:", error);
    throw new Error("Failed to fetch assessments");
  }
}

export async function evaluateCodeWithTestCases(code, language, testCases) {
  const languageMap = {
    javascript: 63,
    python: 71,
    java: 62,
    cpp: 54,
  };

  const languageId = languageMap[language.toLowerCase()];
  if (!languageId) throw new Error("Unsupported language");

  const results = [];

  for (const testCase of testCases) {
    const submissionRes = await fetch(
      "https://judge0-ce.p.rapidapi.com/submissions?base64_encoded=false&wait=false",
      {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
          "X-RapidAPI-Key": process.env.RAPIDAPI_KEY,
          "X-RapidAPI-Host": "judge0-ce.p.rapidapi.com",
        },
        body: JSON.stringify({
          source_code: code,
          language_id: languageId,
          stdin: testCase.input,
        }),
      },
    );

    const { token } = await submissionRes.json();

    // Polling
    let result = null;
    for (let i = 0; i < 10; i++) {
      await new Promise((res) => setTimeout(res, 1500));
      const res = await fetch(
        `https://judge0-ce.p.rapidapi.com/submissions/${token}?base64_encoded=false`,
        {
          headers: {
            "X-RapidAPI-Key": process.env.RAPIDAPI_KEY,
            "X-RapidAPI-Host": "judge0-ce.p.rapidapi.com",
          },
        },
      );
      result = await res.json();
      if (result.status?.id > 2) break;
    }

    results.push({
      input: testCase.input,
      expected: testCase.expectedOutput,
      actual: result.stdout?.trim() ?? "",
      passed: result.stdout?.trim() === testCase.expectedOutput.trim(),
      status: result.status?.description,
      stderr: result.stderr,
      compile_output: result.compile_output,
    });
  }

  return results;
}

export async function generateCodingQuestion() {
  const { userId } = await auth();
  if (!userId) throw new Error("Unauthorized");

  const user = await db.user.findUnique({
    where: { clerkUserId: userId },
    select: { skills: true, industry: true },
  });

  const prompt = `
Generate 1 coding interview question for a ${user?.industry || "software"} engineer${
    user?.skills?.length ? ` with skills in ${user.skills.join(", ")}` : ""
  }.

Return exactly this format:
{
  "title": "string",
  "description": "string",
  "difficulty": "Easy" | "Medium" | "Hard",
  "sampleInput": "string",
  "sampleOutput": "string",
  "testCases": [
    {
      "input": "string",
      "expectedOutput": "string"
    }
  ]
}
`;

  const result = await model.generateContent(prompt);
  const text = result.response
    .text()
    .replace(/```json|```/g, "")
    .trim();
  return JSON.parse(text);
}

export async function generateNewCodingQuestion() {
  const { userId } = await auth();
  if (!userId) throw new Error("Unauthorized");

  const user = await db.user.findUnique({
    where: { clerkUserId: userId },
    select: { skills: true, industry: true },
  });

  const prompt = `
Generate a new coding interview question for a ${user?.industry || "software"} engineer${
    user?.skills?.length ? ` with skills in ${user.skills.join(", ")}` : ""
  }.

Return exactly this format:
{
  "title": "string",
  "description": "string",
  "difficulty": "Easy" | "Medium" | "Hard",
  "sampleInput": "string",
  "sampleOutput": "string",
  "testCases": [
    {
      "input": "string",
      "expectedOutput": "string"
    }
  ]
}
`;

  const result = await model.generateContent(prompt);
  const text = result.response
    .text()
    .replace(/```json|```/g, "")
    .trim();
  return JSON.parse(text);
}
