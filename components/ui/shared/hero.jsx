"use client";
import Link from "next/link";
import React from "react";
import { Button } from "@/components/ui/shared/shadcn/button";
import Lottie from "lottie-react";
import animationData from "@/public/ai-assistant.json";
import { motion } from "framer-motion";

const HeroSection = () => {
  return (
    <section className="relative w-full pt-20 pb-16 overflow-hidden">
      <div className="container mx-auto px-4 md:px-6">
      {/* FLOATING BLOBS */}
      <motion.div
        animate={{ y: [0, 20, 0] }}
        transition={{ repeat: Infinity, duration: 6 }}
        className="absolute top-20 left-10 w-72 h-72 bg-purple-400/20 blur-3xl rounded-full"
      />
      <motion.div
        animate={{ y: [0, -15, 0] }}
        transition={{ repeat: Infinity, duration: 8 }}
        className="absolute bottom-20 right-20 w-96 h-96 bg-pink-400/20 blur-3xl rounded-full"
      />

      {/* GRID: TEXT + VIDEO */}
      <div className="container mx-auto grid grid-cols-1 lg:grid-cols-2 gap-10 items-center relative z-10 px-4 md:px-6">
        {/* LEFT SIDE - TEXT */}
        <motion.div
          initial={{ opacity: 0, y: 40 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.8 }}
          className="space-y-6 text-center lg:text-left"
        >
          <motion.h1
            initial={{ opacity: 0, scale: 0.95 }}
            animate={{ opacity: 1, scale: 1 }}
            transition={{ duration: 1 }}
            className="font-extrabold text-3xl md:text-4xl leading-snug"
          >
            Success Starts Here with <br className="hidden md:block" />
            <span className="bg-gradient-to-r from-purple-500 to-pink-500 bg-clip-text text-transparent">
              Your AI Companion
            </span>
          </motion.h1>

          <p className="lg:max-w-[600px] text-muted-foreground text-sm md:text-base mx-auto lg:mx-0 leading-relaxed">
            Your Intelligent Career Companion: AI-Powered Coaching, Customized
            Guidance, and Tools to Help You Land the Job You Deserve.
          </p>

          {/* SOCIAL PROOF */}
          <p className="text-sm text-muted-foreground">
            Trusted by <span className="font-semibold">10,000+</span> job
            seekers worldwide
          </p>

          {/* CTA BUTTONS */}
          <div className="flex gap-4 justify-center lg:justify-start">
            <Link href="/dashboard">
              <Button
                size="sm"
                variant="outline"
                className="px-8 py-6 text-sm shadow-lg border-purple-500 text-purple-600 hover:bg-purple-50"
              >
                Get Started
              </Button>
            </Link>
          </div>
        </motion.div>

        {/* RIGHT SIDE - YOUTUBE EMBED */}
        <motion.div
          initial={{ opacity: 0, x: 40 }}
          animate={{ opacity: 1, x: 0 }}
          transition={{ duration: 1, delay: 0.2 }}
          className="flex justify-center lg:justify-end"
        >
          <motion.div
            whileHover={{ scale: 1.03 }}
            transition={{ duration: 0.3 }}
            className="rounded-2xl overflow-hidden shadow-xl hover:shadow-2xl hover:shadow-purple-500/20 transition-all w-full"
          >
            <iframe
              src="https://www.youtube.com/embed/Rc8UTB-YWB4?autoplay=0&mute=1&loop=1&playlist=Rc8UTB-YWB4"
              className="w-full aspect-video"
              allow="autoplay; encrypted-media"
            />
          </motion.div>
        </motion.div>
      </div>

      {/* BOTTOM - LOTTIE */}
      <motion.div
        initial={{ opacity: 0, y: 40 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ duration: 1, delay: 0.4 }}
        className="hero-animation-wrapper mt-12 flex justify-center relative z-10"
      >
        <Lottie
          animationData={animationData}
          loop
          autoplay
          className="w-full max-w-[700px] lg:max-w-[900px] drop-shadow-[0_0_20px_rgba(139,92,246,0.4)]"
        />
      </motion.div>
      </div>
    </section>
  );
};

export default HeroSection;
