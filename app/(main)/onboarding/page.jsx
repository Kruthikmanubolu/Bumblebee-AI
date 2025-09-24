// app/onboarding/page.tsx
import { getUserOnBoardingStatus, getUserProfile } from "@/actions/user";
import { industries } from "@/data/industries";
import { redirect } from "next/navigation";
import OnBoardingForm from "./_components/onboarding-form";
import React from "react";

const OnboardingPage = async () => {
  const user = await getUserProfile();

  if (!user) {
    console.warn("User not found, likely unauthenticated");
    return null; // or a <Loading /> spinner
  }

  // Safely extract industryId and subIndustry
  const [industryId = "", subIndustry = ""] =
    user?.industry?.split(" - ") || [];

  const defaultValues = {
    ...user,
    industry: industryId,
    subIndustry,
  };

  return (
    <main>
      <OnBoardingForm industries={industries} defaultValues={defaultValues} />
    </main>
  );
};

export default OnboardingPage;
