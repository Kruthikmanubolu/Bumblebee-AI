// import React from 'react'
// import { redirect } from 'next/navigation';
// import { getUserOnBoardingStatus } from '@/actions/user';

// const IndustryInsights = async() => {
//   const {isOnboarded} = await getUserOnBoardingStatus()

//     if(!isOnboarded){
//       redirect('/dashboard');
//     }
//   return (
//     <div>
//       IndustryInsights
//     </div>
//   )
// }

// export default IndustryInsights

import { getIndustryInsights } from "@/actions/dashboard";
import DashboardView from "./_components/dashboard-view";
import { redirect } from "next/navigation";
import { getUserOnBoardingStatus } from "@/actions/user";

export default async function DashboardPage() {
  const { isOnboarded } = await getUserOnBoardingStatus();

  // If not onboarded, redirect to onboarding page
  // Skip this check if already on the onboarding page
  if (!isOnboarded) {
    redirect("/onboarding");
  }

  const insights = await getIndustryInsights();

  return (
    <div className="container mx-auto">
      <DashboardView insights={insights} />
    </div>
  );
}
