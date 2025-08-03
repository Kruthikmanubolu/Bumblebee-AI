import { link } from "@uiw/react-md-editor";
import { BrainCircuit, Briefcase, LineChart, ScrollText } from "lucide-react";

export const features = [
  {
    icon: <BrainCircuit className="w-10 h-10 mb-4 text-[#FFC107] group-hover:text-black" />,
    title: "AI-Powered Career Guidance",
    description:
      "Get personalized career advice and insights powered by advanced AI technology.",
      link: '/'
  },
  {
    icon: <Briefcase className="w-10 h-10 mb-4 text-[#FFC107] group-hover:text-black" />,
    title: "Interview Preparation",
    description:
      "Practice with role-specific questions and get instant feedback to improve your performance.",
      link: '/interview'
  },
  {
    icon: <LineChart className="w-10 h-10 mb-4 text-[#FFC107] group-hover:text-black" />,
    title: "Industry Insights",
    description:
      "Stay ahead with real-time industry trends, salary data, and market analysis.",
      link: '/dashboard'
  },
  {
    icon: <ScrollText className="w-10 h-10 mb-4 text-[#FFC107] group-hover:text-black" />,
    title: "Smart Resume Creation",
    description: "Generate ATS-optimized resumes with AI assistance.",
    link: '/resume'
  },
];
