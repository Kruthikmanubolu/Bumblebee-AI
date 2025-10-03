"use client";
import React, { useState } from "react";
import { Button } from "../../shared/shadcn/button";
import { ArrowRight, Loader2, CheckCircle2 } from "lucide-react";
import { sendContactEmail } from "@/actions/contact";
import { toast } from "sonner";
import { motion } from "framer-motion";
import Lottie from "lottie-react";
import animationData from "@/public/contact.json";

const StartYourJourneySection = () => {
  const [formData, setFormData] = useState({
    firstName: "",
    lastName: "",
    email: "",
    phone: "",
    question: "",
  });
  const [loading, setLoading] = useState(false);
  const [sent, setSent] = useState(false);

  const handleChange = (e) => {
    setFormData({ ...formData, [e.target.name]: e.target.value });
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    setLoading(true);
    setSent(false);

    try {
      const res = await sendContactEmail(formData);
      if (res.success) {
        toast.success("Message sent successfully!");
        setFormData({
          firstName: "",
          lastName: "",
          email: "",
          phone: "",
          question: "",
        });
        setSent(true);
      } else {
        toast.error("Failed to send message. Try again.");
      }
    } catch (err) {
      toast.error("An error occurred. Try again.");
    } finally {
      setLoading(false);
    }
  };

  return (
    <section className="w-full py-24">
      <div className="container mx-auto px-6 lg:px-12">
        <div className="grid grid-cols-1 md:grid-cols-2 gap-10 items-center">
          {/* LEFT SIDE - Animation + Text */}
          <motion.div
            initial={{ opacity: 0, x: -40 }}
            whileInView={{ opacity: 1, x: 0 }}
            transition={{ duration: 0.6 }}
            className="text-center md:text-left space-y-6"
          >
            <h2 className="text-4xl font-bold tracking-tight text-gray-900 sm:text-5xl">
              Ready to Start Your Journey?
            </h2>
            <p className="text-lg text-gray-700 max-w-md">
              Our experts (and smart AI assistants) are here to help. Fill in
              your details and we’ll get back to you right away.
            </p>
            <Lottie
              animationData={animationData}
              loop={true}
              className="max-w-xs mx-auto md:mx-0"
            />
          </motion.div>

          {/* RIGHT SIDE - Glassmorphism Form */}
          <motion.form
            onSubmit={handleSubmit}
            initial={{ opacity: 0, y: 30 }}
            whileInView={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.6, delay: 0.2 }}
            className="w-full space-y-4 bg-white/70 backdrop-blur-md p-6 rounded-2xl shadow-xl border border-white/40"
          >
            <div>
              <label className="block mb-1 font-medium text-gray-700">
                First Name
              </label>
              <input
                type="text"
                name="firstName"
                value={formData.firstName}
                onChange={handleChange}
                required
                className="w-full rounded-lg border border-gray-300 p-2 focus:ring-2 focus:ring-indigo-400"
                placeholder="First Name"
              />
            </div>

            <div>
              <label className="block mb-1 font-medium text-gray-700">
                Last Name
              </label>
              <input
                type="text"
                name="lastName"
                value={formData.lastName}
                onChange={handleChange}
                required
                className="w-full rounded-lg border border-gray-300 p-2 focus:ring-2 focus:ring-indigo-400"
                placeholder="Last Name"
              />
            </div>

            <div>
              <label className="block mb-1 font-medium text-gray-700">
                Email
              </label>
              <input
                type="email"
                name="email"
                value={formData.email}
                onChange={handleChange}
                required
                className="w-full rounded-lg border border-gray-300 p-2 focus:ring-2 focus:ring-indigo-400"
                placeholder="you@example.com"
              />
            </div>

            <div>
              <label className="block mb-1 font-medium text-gray-700">
                Phone
              </label>
              <input
                type="text"
                name="phone"
                value={formData.phone}
                onChange={handleChange}
                required
                className="w-full rounded-lg border border-gray-300 p-2 focus:ring-2 focus:ring-indigo-400"
                placeholder="+1234567890"
              />
            </div>

            <div>
              <label className="block mb-1 font-medium text-gray-700">
                Question or Concern
              </label>
              <textarea
                name="question"
                value={formData.question}
                onChange={handleChange}
                required
                rows={4}
                className="w-full rounded-lg border border-gray-300 p-2 focus:ring-2 focus:ring-indigo-400"
                placeholder="Write your question or concern..."
              />
            </div>

            <Button
              size="lg"
              type="submit"
              disabled={loading}
              className="w-full h-11 hover:cursor-pointer rounded-xl flex items-center justify-center"
            >
              {loading ? (
                <Loader2 className="animate-spin w-5 h-5" />
              ) : sent ? (
                <span className="flex items-center gap-2">
                  <CheckCircle2 className="w-5 h-5" /> Sent!
                </span>
              ) : (
                <span className="flex items-center gap-2">
                  Send Question <ArrowRight className="w-5 h-5" />
                </span>
              )}
            </Button>
          </motion.form>
        </div>
      </div>
    </section>
  );
};

export default StartYourJourneySection;
