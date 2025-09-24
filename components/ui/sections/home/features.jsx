"use client";
import React, { useState, useEffect } from "react";
import Link from "next/link";
import { Card, CardContent } from "../../shared/shadcn/card";
import { features } from "@/data/features";

const rotatingTexts = [
  "AI-powered guidance",
  "Interview preparation",
  "Industry insights",
  "Resume creation",
  "Cover letter generation",
];

const FeaturesSection = () => {
  const [index, setIndex] = useState(0);
  const [subIndex, setSubIndex] = useState(0);
  const [deleting, setDeleting] = useState(false);

  useEffect(() => {
    if (index === rotatingTexts.length) return;

    const speed = deleting ? 50 : 100;

    const timeout = setTimeout(() => {
      setSubIndex((prev) => (deleting ? prev - 1 : prev + 1));

      if (!deleting && subIndex === rotatingTexts[index].length) {
        setTimeout(() => setDeleting(true), 1000);
      } else if (deleting && subIndex === 0) {
        setDeleting(false);
        setIndex((prev) => (prev + 1) % rotatingTexts.length);
      }
    }, speed);

    return () => clearTimeout(timeout);
  }, [subIndex, deleting, index]);

  return (
    <section className="w-full py-16 pb-24">
      <div className="container mx-auto px-4 md:px-6 text-center">
        {/* Heading */}
        <h2 className="text-4xl font-bond mb-4">Powerful Features</h2>

        {/* Subheading */}
        <div className="flex justify-center items-center my-6 text-center">
          <p className="text-sm md:text-xl lg:text-2xl font-semibold whitespace-nowrap">
            We Offer -- &nbsp;
          </p>

          <h3 className="text-sm md:text-xl lg:text-2xl font-semibold bg-gradient-to-r from-primary to-purple-600 bg-clip-text text-transparent drop-shadow-sm">
            {rotatingTexts[index].substring(0, subIndex)}
            <span className="animate-pulse">|</span>
          </h3>
        </div>

        {/* Features grid */}
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6 lg:gap-8 max-w-6xl mx-auto">
          {features.map((feature, i) => (
            <Link key={i} href={feature.link}>
              <Card className="group border-2 hover:border-primary/70 h-full flex flex-col shadow-md hover:shadow-xl rounded-2xl">
                <CardContent className="pt-8 text-center flex flex-col items-center">
                  <div className="mb-5">{feature.icon}</div>
                  <h3 className="text-xl font-bold mb-2">{feature.title}</h3>
                  <p className="text-muted-foreground text-sm leading-relaxed">
                    {feature.description}
                  </p>
                </CardContent>
              </Card>
            </Link>
          ))}
        </div>
      </div>
    </section>
  );
};

export default FeaturesSection;
