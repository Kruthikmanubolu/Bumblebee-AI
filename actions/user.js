"use server";

import { db } from "@/lib/prisma";
import { auth } from "@clerk/nextjs/server";
import { generateAIInsights } from "./dashboard";
import { checkUser } from "@/lib/checkUser";

export async function updateUser(data) {
  const { userId } = await auth();
  if (!userId) throw new Error("UnAuthorized");

  await checkUser();

  // Find user first
  const user = await db.user.findUnique({
    where: {
      clerkUserId: userId,
    },
  });

  if (!user) throw new Error("User not found");

  // Check if industryInsight already exists outside transaction
  let industryInsight = await db.industryInsight.findUnique({
    where: {
      industry: data.industry,
    },
  });

  // If not exists, generate insights outside the transaction
  let insights = null;
  if (!industryInsight) {
    insights = await generateAIInsights(data.industry);
  }

  try {
    const result = await db.$transaction(async (tx) => {
      // Create industryInsight if not exists
      if (!industryInsight) {
        industryInsight = await tx.industryInsight.create({
          data: {
            industry: data.industry,
            ...insights,
            nextUpdate: new Date(Date.now() + 7 * 24 * 60 * 60 * 1000),
          },
        });
      }

      // Update user
      const updatedUser = await tx.user.update({
        where: {
          id: user.id,
        },
        data: {
          industryInsight: {
            connect: {
              industry: data.industry,
            },
          },
          experience: Number(data.experience),
          bio: data.bio,
          skills: data.skills,
        },
      });

      return { industryInsight, updatedUser };
    });

    return { success: true, ...result };
  } catch (error) {
    console.error("Error updating user and industry:", error.message);
    throw new Error("Failed to update profile: " + error.message);
  }
}

export async function getUserOnBoardingStatus() {
  const { userId } = await auth();
  if (!userId) throw new Error("UnAuthorized");

  await checkUser();

  try {
    const user = await db.user.findUnique({
      where: {
        clerkUserId: userId,
      },
      select: {
        industry: true,
      },
    });

    return {
      isOnboarded: !!user?.industry,
    };
  } catch (error) {
    console.error("Error checking onboarding status:", error.message);
    throw new Error("Failed to check onboarding status");
  }
}

export async function getUser() {
  const { userId } = await auth();
  if (!userId) throw new Error("UnAuthorized");

  await checkUser();

  try {
    const user = await db.user.findUnique({
      where: { clerkUserId: userId },
      select: {
        industry: true,
        subIndustry: true,
        experience: true,
        skills: true,
        bio: true,
      },
    });

    return user;
  } catch (error) {
    console.error("Error fetching user:", error.message);
    throw new Error("Failed to fetch user data");
  }
}

export const getUserProfile = async () => {
  const { userId: clerkUserId } = await auth();

  if (!clerkUserId) return null;

  return await db.user.findUnique({
    where: { clerkUserId },
  });
};
