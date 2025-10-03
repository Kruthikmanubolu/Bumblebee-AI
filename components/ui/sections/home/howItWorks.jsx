"use client";
import React from "react";
import { howItWorks } from "@/data/howItWorks";
import { motion } from "framer-motion";

const containerVariants = {
  hidden: { opacity: 0 },
  show: {
    opacity: 1,
    transition: {
      staggerChildren: 0.2,
    },
  },
};

const itemVariants = {
  hidden: { opacity: 0, y: 30, scale: 0.9 },
  show: { opacity: 1, y: 0, scale: 1, transition: { duration: 0.6 } },
};

const HowItWorksSection = () => {
  return (
    <section className="w-full py-20 gradient-background">
      <div className="container mx-auto px-4 md:px-6">
        {/* Heading */}
        <motion.div
          initial={{ opacity: 0, y: -20 }}
          whileInView={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.6 }}
          viewport={{ once: true }}
          className="text-center max-w-3xl mx-auto mb-16"
        >
          <h2 className="text-4xl font-bond mb-4">How it Works</h2>
          <p className="text-muted-foreground text-lg">
            Four simple steps to accelerate your career growth
          </p>
        </motion.div>

        {/* Steps Grid */}
        <motion.div
          variants={containerVariants}
          initial="hidden"
          whileInView="show"
          viewport={{ once: true }}
          className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-8 max-w-6xl mx-auto"
        >
          {howItWorks.map((item, index) => (
            <motion.div
              key={index}
              variants={itemVariants}
              className="flex flex-col items-center text-center p-6 rounded-lg bg-background/40 shadow-md space-y-4 transition-transform"
            >
              <motion.div
                className="w-16 h-16 rounded-full bg-primary/10 flex items-center justify-center"
              >
                {item.icon}
              </motion.div>
              <h3 className="font-semibold text-xl">{item.title}</h3>
              <p className="text-muted-foreground text-sm">{item.description}</p>
            </motion.div>
          ))}
        </motion.div>
      </div>
    </section>
  );
};

export default HowItWorksSection;
