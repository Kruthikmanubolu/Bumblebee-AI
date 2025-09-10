"use client"

import React from "react"
import { Card, CardContent } from "../../shared/shadcn/card"
import Image from "next/image"
import { testimonial } from "@/data/testimonial"
import { useKeenSlider } from "keen-slider/react"
import { motion } from "framer-motion"

const TestimonialsSection = () => {
    const [sliderRef, slider] = useKeenSlider ({
        loop: true,
        mode: "free-snap",
        slides: {
            perView: 1,
            spacing: 32,
        },
        breakpoints: {
            "(min-width: 768px)": {
                slides: { perView: 2, spacing: 24 },
            },
            "(min-width: 1024px)": {
                slides: { perView: 3, spacing: 24 },
            },
        },
    })


    return (
        <section className="w-full py-20 bg-background/30">
            <div className="container mx-auto px-4 md:px-6">
                <h2 className="text-4xl font-bond text-center mb-16">
                    What Our Users Say
                </h2>

                <div ref={sliderRef} className="keen-slider max-w-6xl mx-auto">
                    {testimonial.map((t, index) => (
                        <motion.div
                            key={index}
                            className="keen-slider__slide px-3"
                            initial={{ opacity: 0, y: 20 }}
                            whileInView={{ opacity: 1, y: 0 }}
                            transition={{ duration: 0.4, delay: index * 0.2 }}
                            viewport={{ once: true }}
                        >
                            <Card className="bg-background shadow-lg hover:shadow-xl transition-shadow duration-300">
                                <CardContent className="pt-6">
                                    <div className="flex flex-col space-y-4">
                                        {/* Header */}
                                        <div className="flex items-center space-x-4">
                                            <div className="relative h-12 w-12 flex-shrink-0">
                                                <Image
                                                    src={t.image}
                                                    width={48}
                                                    height={48}
                                                    alt={t.author}
                                                    className="rounded-full object-cover border-2 border-primary/20"
                                                />
                                            </div>
                                            <div>
                                                <p className="font-semibold text-base">{t.author}</p>
                                                <p className="text-sm text-muted-foreground">{t.role}</p>
                                                <p className="text-sm text-primary font-medium">
                                                    {t.company}
                                                </p>
                                            </div>
                                        </div>

                                        {/* Rating */}
                                        <div className="flex text-yellow-400">
                                            {Array.from({ length: t.rating }).map((_, i) => (
                                                <svg
                                                    key={i}
                                                    className="w-4 h-4 fill-current"
                                                    viewBox="0 0 20 20"
                                                >
                                                    <path d="M9.049 2.927c.3-.921 1.603-.921 
                            1.902 0l1.286 3.948a1 
                            1 0 00.95.69h4.148c.969 0 
                            1.371 1.24.588 1.81l-3.36 
                            2.44a1 1 0 00-.364 1.118l1.287 
                            3.949c.3.921-.755 
                            1.688-1.54 1.118l-3.36-2.44a1 
                            1 0 00-1.176 0l-3.36 
                            2.44c-.784.57-1.838-.197-1.539-1.118l1.287-3.949a1 
                            1 0 00-.364-1.118l-3.36-2.44c-.783-.57-.38-1.81.588-1.81h4.148a1 
                            1 0 00.95-.69l1.286-3.948z" />
                                                </svg>
                                            ))}
                                        </div>

                                        {/* Quote */}
                                        <blockquote className="italic text-muted-foreground relative">
                                            <span className="text-3xl text-primary absolute -top-4 -left-2">
                                                “
                                            </span>
                                            {t.quote}
                                            <span className="text-3xl text-primary absolute -bottom-4 right-2">
                                                ”
                                            </span>
                                        </blockquote>
                                    </div>
                                </CardContent>
                            </Card>
                        </motion.div>
                    ))}
                </div>
            </div>
        </section>
    )
}

export default TestimonialsSection
