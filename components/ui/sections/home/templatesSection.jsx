import React from 'react'
import { Card, CardContent } from '../../shared/shadcn/card';
import Image from 'next/image';
import { templates } from '@/data/templates';
const TemplatesSection = () => {
    return (
        <section className="w-full py-20 bg-gradient-to-br from-blue-50 to-purple-50">
            <div className="container mx-auto px-4 md:px-6">
                <h2 className="text-4xl font-bond text-center mb-4">
                    Resume & Cover Letter Templates
                </h2>
                <p className="text-muted-foreground text-center mb-16 max-w-2xl mx-auto">
                    Compared before and after AI-enhanced career documents and see the difference.
                </p>

                <div className="grid grid-cols-1 md:grid-cols-2 gap-8 max-w-6xl mx-auto">
                    {templates.map((template, index) => (
                        <Card
                            key={index}
                            className="shadow-lg hover:shadow-xl transition-all duration-300 bg-white/90 backdrop-blur-lg rounded-2xl overflow-hidden"
                        >
                            <CardContent className="p-6">
                                <h3 className="text-xl font-bold mb-2">{template.type}</h3>
                                <p className="text-muted-foreground mb-6">{template.description}</p>

                                <div className="grid grid-cols-1 lg:grid-cols-2 gap-4">
                                    {["before", "after"].map((stage) => {
                                        const file = template[stage];
                                        return (
                                            <div
                                                className="relative rounded-lg overflow-hidden border bg-white shadow-sm"
                                                key={stage}
                                            >
                                                {/* Label */}
                                                <span className={`absolute top-2 left-2 px-2 py-1 text-xs font-semibold rounded z-10 ${stage === "before"
                                                    ? "bg-gray-200 text-gray-800"
                                                    : "bg-green-100 text-green-800"
                                                    }`}>
                                                    {stage === "before" ? "Before AI" : "After AI"}
                                                </span>

                                                {/* Aspect Ratio Box */}
                                                <div className="relative w-full pt-[140%]">
                                                    {/* This gives a tall aspect ratio similar to a resume page */}
                                                    {file.type === "image" ? (
                                                        <Image
                                                            src={file.src}
                                                            alt={`${template.type} ${stage}`}
                                                            fill
                                                            className="absolute inset-0"
                                                        />
                                                    ) : (
                                                        <iframe
                                                            src={file.src}
                                                            className="absolute inset-0 w-full h-full border-none"
                                                        />
                                                    )}
                                                </div>
                                            </div>
                                        );
                                    })}
                                </div>
                            </CardContent>
                        </Card>
                    ))}
                </div>
            </div>
        </section>
    )
}

export default TemplatesSection