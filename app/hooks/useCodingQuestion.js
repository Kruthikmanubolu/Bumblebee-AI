"use client";
import { useState } from "react";
import {
  evaluateCodeWithTestCases,
  generateCodingQuestion,
  generateNewCodingQuestion,
} from "@/actions/interview";

export function useCodingQuestion() {
  const [question, setQuestion] = useState(null);
  const [results, setResults] = useState([]);
  const [loading, setLoading] = useState(false);
  const [submitting, setSubmitting] = useState(false);
  const [language, setLanguage] = useState("javascript");
  const [code, setCode] = useState("// Write your code here");

  const fetchQuestion = async () => {
    setLoading(true);
    try {
      const q = await generateCodingQuestion();
      setQuestion(q);
      setResults([]);
    } catch (err) {
      console.error(err);
    } finally {
      setLoading(false);
    }
  };

  const newFetchQuestion = async () => {
    setLoading(true);
    try {
      const q = await generateNewCodingQuestion();
      setQuestion(q);
      setResults([]);
    } catch (err) {
      console.error(err);
    } finally {
      setLoading(false);
    }
  };

  const submitCode = async () => {
    if (!question || !question.testCases) return;

    setSubmitting(true);
    try {
      const res = await evaluateCodeWithTestCases(
        code,
        language,
        question.testCases,
      );
      setResults(res);
    } catch (err) {
      console.error(err);
    } finally {
      setSubmitting(false);
    }
  };

  return {
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
  };
}
