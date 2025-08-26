"use client";
import HeroSection from "@/components/ui/shared/hero";
import WhyBumbleBeeSection from "@/components/ui/sections/home/whyBumbleBee";
import FeaturesSection from "@/components/ui/sections/home/features";
import HowItWorksSection from "@/components/ui/sections/home/howItWorks";
import TestimonialsSection from "@/components/ui/sections/home/testimonials";
import TemplatesSection from "@/components/ui/sections/home/templatesSection";
import SeeItInActionSection from "@/components/ui/sections/home/seeItInAction";
import FaqSection from "@/components/ui/sections/home/faq";
import StartYourJourneySection from "@/components/ui/sections/home/startYourJourneySection";
import Comparison from "@/components/ui/sections/home/comparison";
export default function Home() {
  return (
    <div className="overflow-hidden">
      <div className="grid-background"/>
      <HeroSection />
      <FeaturesSection />
      <WhyBumbleBeeSection />
      <Comparison />
      <HowItWorksSection />
      <TestimonialsSection />
      <TemplatesSection />
      <SeeItInActionSection />
      <FaqSection />
      <StartYourJourneySection />
    </div>
  );
}
