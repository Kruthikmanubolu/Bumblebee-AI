"use client";
import Link from "next/link";
import React, { useEffect, useRef, useState } from "react";
import { Button } from "@/components/ui/shared/shadcn/button";
import Lottie from "lottie-react";

const HeroSection = () => {
  // const imageRef = useRef(null)
  // const animationRef = useRef(null)
  // const [loading, setLoading] = useState(false)

  const handleClick = async () => {
    setLoading(true);
    await new Promise((r) => setTimeout(r, 2000)); // Simulate delay
    setLoading(false);
  };

  const [animationData, setAnimationData] = useState(null);

  useEffect(() => {
    fetch("/ai-assistant.json")
      .then((res) => res.json())
      .then(setAnimationData);
  }, []);

  if (!animationData) return null; // avoid rendering before data is loaded

  // useEffect(() => {
  //     const imageElement = imageRef.current
  //     const handleScroll = () => {
  //         const scrollPosition = window.scrollY;
  //         const scrollThreshold = 100;

  //         if (scrollPosition > scrollThreshold) {
  //             imageElement.classList.add("scrolled")
  //         }
  //         else {
  //             imageElement.classList.remove('scrolled')
  //         }
  //     }

  //     window.addEventListener('scroll', handleScroll)

  //     return () => window.removeEventListener('scroll', handleScroll)

  // }, [])
  return (
    <section className="w-full pt-24 md:pt-36 pb-10">
      <div className="space-y-6 text-center">
        <div className="space-y-6 mx-auto">
          <h1 className="text-4xl font-bold md:text-6xl lg:text-7xl xl:text-8xl gradient-title px-2 md:px-0">
            Success Starts Here with
            <br />
            Your AI Companion
          </h1>
          <p className="mx-auto max-w-[600px] text-muted-foreground md:text-lg px-2 md:px-0">
            Your Intelligent Career Companion: AI-Powered Coaching, Customized
            Guidance, and Tools to Help You Land the Job You Deserve
          </p>
        </div>

        <div className="flex justify-center space-x-4">
          <Link href="/dashboard">
            <Button
              size="lg"
              className="px-8 hover:cursor-pointer"
              onClick={handleClick}
            >
              Get Started
            </Button>
          </Link>
        </div>

        <div className="hero-animation-wrapper">
          <Lottie
            animationData={animationData}
            loop
            autoplay
            className="md:mx-auto md:w-[700px] lg:w-[1200px]"
          />
        </div>
      </div>
    </section>
  );
};

export default HeroSection;
