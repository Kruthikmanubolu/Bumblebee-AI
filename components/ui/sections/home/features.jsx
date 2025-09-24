import React from "react";
import Link from "next/link";
import { Card, CardContent } from "../../shared/shadcn/card";
import { features } from "@/data/features";
const FeaturesSection = () => {
  return (
    <section className="w-full py-10 pb-20 gradient-background">
      <div className="container mx-auto px-4 md:px-6">
        <h2 className="text-4xl font-bond text-center mb-16">
          Powerful Features for your Career Growth
        </h2>
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-8 max-w-6xl mx-auto">
          {features.map((feature, index) => (
            <Link key={index} href={feature.link}>
              <Card className="group border-2 hover:border-primary transition-transform transform hover:-translate-y-1 duration-300 h-full flex flex-col shadow-md hover:shadow-lg">
                <CardContent className="pt-6 text-center flex flex-col items-center">
                  <div className="mb-4 scale-100 group-hover:scale-110 transition-transform duration-300">
                    {feature.icon}
                  </div>
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
