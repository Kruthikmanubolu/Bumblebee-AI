"use client";
import React from "react";
import { motion } from "framer-motion";

const SeeItInActionSection = () => {
  return (
    <section className="py-20 bg-background/40">
      <div className="container mx-auto text-center px-4 md:px-6">
        {/* Heading */}
        <motion.h2
          initial={{ opacity: 0, y: -20 }}
          whileInView={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.6 }}
          viewport={{ once: true }}
          className="text-4xl font-bond mb-4"
        >
          See It in Action
        </motion.h2>

        {/* Paragraph */}
        <motion.p
          initial={{ opacity: 0, y: 10 }}
          whileInView={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.6, delay: 0.2 }}
          viewport={{ once: true }}
          className="text-muted-foreground mb-8"
        >
          Watch how BumbleBee helps you to create a cover letter template with
          just minimal effort.
        </motion.p>

        {/* Video */}
        <motion.div
          initial={{ opacity: 0, scale: 0.95 }}
          whileInView={{ opacity: 1, scale: 1 }}
          whileHover={{ scale: 1.02, y: -5 }}
          transition={{ duration: 0.7, delay: 0.3 }}
          viewport={{ once: true }}
          className="relative max-w-6xl mx-auto rounded-2xl overflow-hidden shadow-lg"
        >
          <video className="w-full" controls poster="/video-thumbnail.png">
            <source src="/demo.mp4" type="video/mp4" />
          </video>
        </motion.div>
      </div>
    </section>
  );
};

export default SeeItInActionSection;
