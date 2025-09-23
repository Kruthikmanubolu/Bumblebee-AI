import { NextResponse } from "next/server";
import { getIndustryInsights } from "@/actions/dashboard";

export async function GET() {
  try {
    const insights = await getIndustryInsights();
    return NextResponse.json(insights);
  } catch (error) {
    console.error("Error fetching insights:", error);
    return NextResponse.json(
      { error: "Failed to fetch insights" },
      { status: 500 },
    );
  }
}
