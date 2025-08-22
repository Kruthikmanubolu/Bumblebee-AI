"use client";
import HeroSection from "@/components/shared/hero";
import WhyBumbleBeeSection from "@/components/sections/home/whyBumbleBee";
import FeaturesSection from "@/components/sections/home/features";
import HowItWorksSection from "@/components/sections/home/howItWorks";
import TestimonialsSection from "@/components/sections/home/testimonials";
import TemplatesSection from "@/components/sections/home/templatesSection";
import SeeItInActionSection from "@/components/sections/home/seeItInAction";
import FaqSection from "@/components/sections/home/faq";
import StartYourJourneySection from "@/components/sections/home/startYourJourneySection";
export default function Home() {
  return (
    <div className="overflow-hidden">
      <div className="grid-background"/>
      <HeroSection />
      <FeaturesSection />
      <WhyBumbleBeeSection />
      <HowItWorksSection />
      <TestimonialsSection />
      <TemplatesSection />
      <SeeItInActionSection />
      <FaqSection />
      <StartYourJourneySection />
    </div>
  );
}
