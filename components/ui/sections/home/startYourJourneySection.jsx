import React from "react";
import { Button } from "../../shared/shadcn/button";
import Link from "next/link";
import { ArrowRight } from "lucide-react";
const StartYourJourneySection = () => {
  return (
    <section className="w-full">
      <div className="mx-auto py-24 gradient rounded-lg">
        <div className="flex flex-col items-center justify-center space-y-6 text-center max-w-3xl mx-auto">
          <h2 className="text-4xl font-bond tracking-tight text-black sm:text-5xl">
            Ready to Accelerate Your Career?
          </h2>
          <p className="mx-auto max-w-[600px] text-black md:text-xl px-2">
            Join thousands of professionals who are advancing their careers with
            AI-powered guidance.
          </p>
          <Link href="/dashboard">
            <Button
              size="lg"
              className="h-11 animate-bounce bg-black text-white hover:cursor-pointer"
              variant="primary"
            >
              Start Your Journey Today <ArrowRight className="ml-2 h-4 w-4" />
            </Button>
          </Link>
        </div>
      </div>
    </section>
  );
};

export default StartYourJourneySection;
