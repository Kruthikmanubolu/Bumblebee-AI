import Link from "next/link";
import { ArrowLeft } from "lucide-react";
import { Button } from "@/components/ui/shared/shadcn/button";
import Quiz from "../_components/quiz";
import CodingQuestionCard from "../_components/coding-questions-card";
import { auth } from "@clerk/nextjs/server";
import { db } from "@/lib/prisma";

export default async function MockInterviewPage() {
  const { userId } = await auth();
  if (!userId) throw new Error("Unauthorized");

  const user = await db.user.findUnique({
    where: { clerkUserId: userId }, // 🔍 make sure this matches your Prisma schema!
    select: { industry: true },
  });

  console.log("User industry:", user?.industry);

  const sampleQuestion = {
    title: "FizzBuzz",
    description: "Write a program that prints the numbers from 1 to 100...",
    difficulty: "Easy",
    sampleInput: "",
    sampleOutput: "1\n2\nFizz\n4\nBuzz\n…",
    hint: "Use modulo (%) to test divisibility.",
  };

  return (
    <div className="container mx-auto space-y-4 py-6">
      <div className="flex flex-col space-y-2 mx-2">
        <Link href="/interview">
          <Button variant="link" className="gap-2 pl-0">
            <ArrowLeft className="h-4 w-4" />
            Back to Interview Preparation
          </Button>
        </Link>

        <div>
          <h1 className="text-6xl font-bold gradient-title">Mock Interview</h1>
          <p className="text-muted-foreground">
            Test your knowledge with industry-specific questions
          </p>
        </div>
      </div>

      <Quiz />

      {/* Coding question only for Technology */}
      {user?.industry && user.industry.startsWith('tech') ? (
        <CodingQuestionCard question={sampleQuestion} />
      ) : (
        <div className="flex items-center justify-center mt-6 mx-2">
          <p className="text-sm text-center">
            Coding questions are only available for Technology industry.
          </p>

        </div>


      )}
    </div>
  );
}
