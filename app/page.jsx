'use client'
import HeroSection from "@/components/hero";
import { Button } from "@/components/ui/button";
import { features } from "@/data/features";
import { Card, CardContent, CardFooter } from "@/components/ui/card";
import { howItWorks } from "@/data/howItWorks";
import { testimonial } from "@/data/testimonial";
import Image from "next/image";
import { faqs } from "@/data/faqs";
import { Accordion, AccordionContent, AccordionItem, AccordionTrigger } from "@/components/ui/accordion";
import { ArrowRight } from "lucide-react";
import Link from "next/link";
export default function Home() {
  return (
    <div>
      <div className="grid-background"></div>

      <HeroSection />

      <section className="w-full py-12 md:py-24 bg-gray-900">
        <div className="container mx-auto px-4 md:px-6">
          <h2 className="text-5xl font-extrabold text-center text-tighter mb-12 text-[#FFC107]">Powerful Features for Your Career Growth</h2>
          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6 max-w-6xl mx-auto">
            {features.map((feature, index) => {
              return (
                <Link href={feature.link}>
                  <Card
                    key={index}
                    className="group border-[#FFC107] hover:bg-[#FFC107] transition-colors duration-300 h-full flex flex-col"
                  >
                    <CardContent className="pt-6 text-center flex flex-col items-center">
                      <div className="flex flex-col items-center justify-center text-[#FFC107]">
                        {feature.icon}
                        <h3 className="text-xl font-bold mb-2 group-hover:text-black">
                          {feature.title}
                        </h3>
                        <p className="text-white group-hover:text-black">
                          {feature.description}
                        </p>
                      </div>
                    </CardContent>
                  </Card>
                </Link>
              )
            })}
          </div>
        </div>
      </section>

      <section className="w-full py-12 md:py-24 bg-background/30">
        <div className="container mx-auto px-4 md:px-6">
          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6 max-w-6xl mx-auto">
            <div className="flex flex-col items-center justify-center space-y-2 p-8 rounded-2xl bg-gray-900 border-2 border-[#FFC107]">
              <h3 className="text-4xl font-extrabold text-[#FFC107]">50+</h3>
              <p className="font-extrabold">Industries Covered</p>
            </div>

            <div className="flex flex-col items-center justify-center space-y-2 p-8 rounded-2xl bg-gray-900 border-2 border-[#FFC107]">
              <h3 className="text-4xl font-extrabold text-[#FFC107]">1000+</h3>
              <p className="font-extrabold">Interview Questions</p>
            </div>

            <div className="flex flex-col items-center justify-center space-y-2 p-8 rounded-2xl bg-gray-900 border-2 border-[#FFC107]">
              <h3 className="text-4xl font-extrabold text-[#FFC107]">95%</h3>
              <p className="font-extrabold">Success Rate</p>
            </div>

            <div className="flex flex-col items-center justify-center space-y-2 p-8 rounded-2xl bg-gray-900 border-2 border-[#FFC107]">
              <h3 className="text-4xl font-extrabold text-[#FFC107]">24/7</h3>
              <p className="font-extrabold">AI Support</p>
            </div>
          </div>
        </div>
      </section>

      <section className="w-full py-12 md:py-24 bg-gray-900">
        <div className="container mx-auto px-4 md:px-6">
          <div className="text-center max-w-3xl mx-auto mb-12">
            <h2 className="text-5xl font-extrabold mb-4 text-[#FFC107]">How it Works</h2>
            <p className="text-xl">
              Four simple steps to accelerate your career growth
            </p>
          </div>
          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6 max-w-6xl mx-auto">
            {howItWorks.map((item, index) => {
              return (
                <div key={index} className="flex flex-col items-center text-center space-y-4 bg-black p-8 border-2 border-[#FFC107] rounded-2xl">
                  <div className="w-16 h-16 rounded-full bg-primary/10 flex items-center justify-center">
                    {item.icon}
                  </div>

                  <h3 className="font-semibold text-xl text-[#FFC107]">{item.title}</h3>
                  <p className="text-white">{item.description}</p>
                </div>
              )
            })}
          </div>

        </div>
      </section>


      <section className="w-full py-12 md:py-24 bg-background/30">
        <div className="container mx-auto px-4 md:px-6">
          <h2 className="text-5xl font-extrabold text-center text-tighter mb-12 text-[#FFC107]">What Our Users Say</h2>
          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8 max-w-6xl mx-auto">
            {testimonial.map((testimonial, index) => {
              return (
                <Card key={index} className='bg-gray-900 border-2 border-[#FFC107]'>
                  <CardContent className='pt-4'>
                    <div className="flex flex-col space-y-4">
                      <div className="flex items-center space-x-4">
                        <div className="relative h-12 w-12 flex-shrink-0">
                          <Image src={testimonial.image} width={40} height={40} alt={testimonial.author} className="rounded-full object-cover border-2 border-primary/20" />
                        </div>
                        <div>
                          <p className="font-semibold text-[#FFC107]">{testimonial.author}</p>
                          <p className="text-sm text-muted-foreground">{testimonial.role}</p>
                          <p className="text-sm text-primary">{testimonial.company}</p>
                        </div>
                      </div>
                      <blockquote>
                        <p className="text-white italic relative">
                          <span className="text-3xl text-primary absolute -top-4 -left-2">
                            &quot;
                          </span>
                          {testimonial.quote}
                          <span className="text-3xl text-primary absolute -bottom-4">&quot;</span>
                        </p>
                      </blockquote>
                    </div>
                  </CardContent>
                </Card>
              )
            })}
          </div>
        </div>
      </section>

      <section className="w-full py-12 md:py-24 bg-gray-900">
        <div className="container mx-auto px-4 md:px-6">
          <div className="text-center max-w-3xl mx-auto mb-12">
            <h2 className="text-5xl font-extrabold mb-4 text-[#FFC107]">Frequently Asked Questions</h2>
            <p className="text-white">
              Find answers to common questions about our platforms
            </p>
          </div>
          <div className="max-w-6xl mx-auto">
            <Accordion type='single' collapsible className='w-full'>
              {faqs.map((faq, index) => {
                return (
                  <AccordionItem key={index} className='text-[#FFC107]' value={`item-${index}`}>
                    <AccordionTrigger>
                      {faq.question}
                    </AccordionTrigger>
                    <AccordionContent>
                      {faq.answer}
                    </AccordionContent>
                  </AccordionItem>
                )
              })}
            </Accordion>
          </div>

        </div>
      </section>

      <section className="w-full bg-[#FFC107]">
        <div className="mx-auto py-24 gradient rounded-lg">
          <div className="flex flex-col items-center justify-center space-y-4 text-center max-w-3xl mx-auto">
            <h2 className="text-3xl font-bond tracking-tighter text-black sm:text-4xl md:text-5xl">Ready to Accelerate Your Career? </h2>
            <p className="mx-auto max-w-[600px] text-black md:text-xl">
              Join thousands of professionals who are advancing their careers with AI-powered guidance
            </p>
            <Link href='/dashboard'>
              <Button size='lg' className='h-11 mt-5 animate-bounce bg-black text-white rounded-2xl' variant='primary'>
                Start Your Journey Today <ArrowRight className="ml-2 h-4 w-4" />
              </Button>
            </Link>
          </div>
        </div>
      </section>
    </div>

  );
}
