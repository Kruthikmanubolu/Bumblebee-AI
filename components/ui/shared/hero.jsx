"use client";
import Link from "next/link";
import React from "react";
import { Button } from "@/components/ui/shared/shadcn/button";
import Lottie from "lottie-react";
import animationData from "@/public/ai-assistant.json";

const HeroSection = () => {
  return (
    <section className="w-full pt-24 pb-10">
      {/* GRID: TEXT + VIDEO */}
      <div className="container mx-auto grid grid-cols-1 lg:grid-cols-2 gap-10 items-center px-4 md:px-6">
        {/* LEFT SIDE - TEXT */}
        <div className="space-y-6 text-center lg:text-left">
          <h1 className="text-xl font-bold md:text-3xl xl:text-5xl gradient-title">
            Success Starts Here with Your AI Companion
          </h1>
          <p className="lg:max-w-[600px] text-muted-foreground text-sm mx-auto lg:mx-0">
            Your Intelligent Career Companion: AI-Powered Coaching, Customized
            Guidance, and Tools to Help You Land the Job You Deserve
          </p>

          <div className="flex justify-center lg:justify-start">
            <Link href="/dashboard">
              <Button size="lg" className="px-8 hover:cursor-pointer">
                Get Started
              </Button>
            </Link>
          </div>
        </div>

        {/* RIGHT SIDE - YOUTUBE EMBED */}
        <div className="flex justify-center lg:justify-end">
          <iframe
            src="https://www.youtube.com/embed/Rc8UTB-YWB4?autoplay=0&mute=1&loop=1&playlist=Rc8UTB-YWB4"
            className="rounded-2xl shadow-lg w-full max-w-[1000px] aspect-video"
            allow="autoplay; encrypted-media"
          />
        </div>
      </div>

      {/* BOTTOM - LOTTIE */}
      <div className="hero-animation-wrapper mt-12 flex justify-center">
        <Lottie
          animationData={animationData}
          loop
          autoplay
          className="w-full max-w-[700px] lg:max-w-[900px]"
        />
      </div>
    </section>
  );
};

export default HeroSection;
