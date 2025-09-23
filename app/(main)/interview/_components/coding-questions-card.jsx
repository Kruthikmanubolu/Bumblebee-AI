"use client";

import Editor from "@monaco-editor/react";
import { Button } from "@/components/ui/shared/shadcn/button";
import { useCodingQuestion } from "@/app/hooks/useCodingQuestion";
import {
  Card,
  CardHeader,
  CardContent,
  CardTitle,
  CardFooter,
} from "@/components/ui/shared/shadcn/card";

export default function CodingQuestionCard() {
  const {
    question,
    results,
    loading,
    submitting,
    language,
    code,
    setCode,
    setLanguage,
    fetchQuestion,
    newFetchQuestion,
    submitCode,
  } = useCodingQuestion();

  return (
    <div className="space-y-6">
      {!question && (
        <Card className="mx-2">
          <CardHeader>
            <CardTitle>Want to solve some coding questions?</CardTitle>
          </CardHeader>
          <CardContent>
            <p className="text-muted-foreground">
              This quiz contains 1 coding question specific to your industry and
              skills. Take your time to think and complete the question.
            </p>
          </CardContent>
          <CardFooter>
            <Button onClick={fetchQuestion} className="w-full">
              {loading ? "Loading..." : "Get Coding Question"}
            </Button>
          </CardFooter>
        </Card>
      )}

      {question && (
        <div className="bg-muted p-4 rounded space-y-2">
          <h2 className="text-xl font-semibold">{question.title}</h2>
          <p>{question.description}</p>
          <p>
            <strong>Difficulty:</strong> {question.difficulty}
          </p>
          <p>
            <strong>Sample Input:</strong> {question.sampleInput}
          </p>
          <p>
            <strong>Sample Output:</strong> {question.sampleOutput}
          </p>

          <div>
            <label className="text-sm font-medium">Language</label>
            <select
              value={language}
              onChange={(e) => setLanguage(e.target.value)}
              className="ml-2 border rounded px-2 py-1"
            >
              <option value="javascript">JavaScript</option>
              <option value="python">Python</option>
              <option value="cpp">C++</option>
              <option value="java">Java</option>
            </select>
          </div>

          <Editor
            height="300px"
            language={language}
            value={code}
            onChange={(v) => setCode(v || "")}
            theme="vs-dark"
          />
          <div className="flex justify-between">
            <Button onClick={submitCode} disabled={submitting}>
              {submitting ? "Running..." : "Submit Code"}
            </Button>

            {results.length > 0 && results.every((r) => r.passed) && (
              <Button onClick={newFetchQuestion}>Next Question</Button>
            )}
          </div>

          {results.length > 0 && (
            <div className="mt-4 space-y-2">
              <h3 className="font-semibold">Test Case Results</h3>
              {results.map((r, i) => (
                <div
                  key={i}
                  className={`p-2 rounded ${
                    r.passed ? "bg-green-100" : "bg-red-100"
                  }`}
                >
                  <p>
                    <strong>Input:</strong> {r.input}
                  </p>
                  <p>
                    <strong>Expected:</strong> {r.expected}
                  </p>
                  <p>
                    <strong>Actual:</strong> {r.actual}
                  </p>
                  <p>
                    <strong>Status:</strong>{" "}
                    <span
                      className={r.passed ? "text-green-600" : "text-red-600"}
                    >
                      {r.passed ? "✅ Passed" : "❌ Failed"}
                    </span>
                  </p>
                </div>
              ))}
            </div>
          )}
        </div>
      )}
    </div>
  );
}
