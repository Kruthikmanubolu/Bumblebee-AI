import React from 'react'

const WhyBumbleBeeSection = () => {
    return (
        <section className="w-full py-20 bg-background/30">
            <div className="container mx-auto px-4 md:px-6">
                <h2 className="text-4xl font-bond text-center mb-4">
                    Why BumbleBee?
                </h2>
                <p className="text-muted-foreground text-center mb-16 max-w-2xl mx-auto">
                    We combine AI-powered technology with industry expertise to give your career the boost it deserves.
                </p>

                <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-8 max-w-6xl mx-auto">
                    {[
                        {
                            title: "Personalized Guidance",
                            description:
                                "Our AI tailors recommendations to match your unique skills, goals, and industry.",
                        },
                        {
                            title: "Proven Success",
                            description:
                                "95% of users see measurable improvements in interviews and job offers.",
                        },
                        {
                            title: "Wide Industry Coverage",
                            description:
                                "Insights and templates for over 50 industries, from tech to healthcare.",
                        },
                        {
                            title: "Constantly Evolving",
                            description:
                                "We update our tools and templates to stay ahead of industry trends.",
                        },
                    ].map((item, index) => (
                        <div
                            key={index}
                            className="p-6 rounded-xl bg-background/40 shadow-md hover:shadow-lg transition-all duration-300 text-center"
                        >
                            <h3 className="text-xl font-semibold mb-2">{item.title}</h3>
                            <p className="text-muted-foreground text-sm leading-relaxed">
                                {item.description}
                            </p>
                        </div>
                    ))}
                </div>
            </div>
        </section>
    )
}

export default WhyBumbleBeeSection
