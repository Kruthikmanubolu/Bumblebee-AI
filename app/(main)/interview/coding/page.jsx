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
    where: { clerkUserId: userId },
    select: { industry: true },
  });

  console.log("User industry:", user?.industry);

  return (
    <div className="container mx-auto space-y-8 py-10">
      {/* Back Button */}
      <Link href="/interview">
        <Button variant="link" className="gap-2 pl-0 mb-2">
          <ArrowLeft className="h-4 w-4" />
          Back to Interview Preparation
        </Button>
      </Link>

      {/* Hero Section */}
      <div className="p-8 rounded-2xl shadow-xl">
        <h1 className="text-5xl font-extrabold">Coding Practice</h1>
        <p className="mt-2 text-lg opacity-90">
          Sharpen your skills with AI-powered coding practice tailored to your industry.
        </p>
      </div>

      {/* Main Content */}
        {/* Quiz Card */}
        {/* <div className="p-6 rounded-2xl shadow-md bg-white/90 backdrop-blur">
          <h2 className="text-xl font-semibold mb-4">Quick Quiz</h2>
          <Quiz />
        </div> */}

        {/* Coding Question (if tech) */}
        {user?.industry && user.industry.toLowerCase().startsWith("tech") ? (
          <div className="p-6 rounded-2xl shadow-md bg-white/90 backdrop-blur">
            <h2 className="text-xl font-semibold mb-4">Coding Challenge</h2>
            <CodingQuestionCard question={sampleQuestion} />
          </div>
        ) : (
          <div className="flex flex-col items-center justify-center text-center p-6 border border-dashed rounded-xl bg-gray-50">
            <p className="text-muted-foreground mb-3">
              ⚠️ Coding questions are only available for the{" "}
              <b>Technology</b> industry.
            </p>
            <Link href="/onboarding">
              <Button variant="outline">Update Industry</Button>
            </Link>
          </div>
        )}
      </div>
  );
}
