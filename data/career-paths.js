import {
  Code,
  Database,
  BarChart,
  ShieldCheck,
  Atom,
  Brain,
  Layers3,
  Bot,
} from "lucide-react";

export const careerPaths = [
  {
    track: "Software Engineer",
    path: [
      {
        title: "Junior Software Engineer",
        years: "0–2",
        icon: <Code />,
        description: "Writes features under guidance",
      },
      {
        title: "Software Engineer",
        years: "2–5",
        icon: <Code />,
        description: "Builds scalable apps & services",
      },
      {
        title: "Senior Software Engineer",
        years: "5–8",
        icon: <Code />,
        description: "Owns systems & mentors peers",
      },
      {
        title: "Staff Engineer",
        years: "8–10+",
        icon: <Brain />,
        description: "Architects complex systems",
      },
      {
        title: "Principal Engineer",
        years: "10+",
        icon: <Brain />,
        description: "Drives org-level tech direction",
      },
    ],
  },
  {
    track: "Data Engineer",
    path: [
      {
        title: "Junior Data Engineer",
        years: "0–2",
        icon: <Database />,
        description: "Builds basic ETL pipelines",
      },
      {
        title: "Data Engineer",
        years: "2–5",
        icon: <Database />,
        description: "Manages data warehouses and flows",
      },
      {
        title: "Senior Data Engineer",
        years: "5–8",
        icon: <Database />,
        description: "Optimizes infrastructure & performance",
      },
      {
        title: "Lead Data Engineer",
        years: "8+",
        icon: <Brain />,
        description: "Designs scalable data architecture",
      },
    ],
  },
  {
    track: "Data Scientist",
    path: [
      {
        title: "Junior Data Scientist",
        years: "0–2",
        icon: <Atom />,
        description: "Performs exploratory analysis & modeling",
      },
      {
        title: "Data Scientist",
        years: "2–5",
        icon: <Atom />,
        description: "Builds models, interprets results",
      },
      {
        title: "Senior Data Scientist",
        years: "5–8",
        icon: <Atom />,
        description: "Leads data-driven decision making",
      },
      {
        title: "Principal Data Scientist",
        years: "8+",
        icon: <Brain />,
        description: "Drives ML strategy and research",
      },
    ],
  },
  {
    track: "Data Analyst",
    path: [
      {
        title: "Junior Data Analyst",
        years: "0–2",
        icon: <BarChart />,
        description: "Creates reports & dashboards",
      },
      {
        title: "Data Analyst",
        years: "2–4",
        icon: <BarChart />,
        description: "Uncovers trends & patterns in data",
      },
      {
        title: "Senior Data Analyst",
        years: "4–6",
        icon: <BarChart />,
        description: "Guides business decisions with insights",
      },
      {
        title: "Analytics Lead",
        years: "6+",
        icon: <Brain />,
        description: "Oversees analytics strategy & governance",
      },
    ],
  },
  {
    track: "Cybersecurity Analyst",
    path: [
      {
        title: "Security Analyst",
        years: "0–2",
        icon: <ShieldCheck />,
        description: "Monitors threats & incidents",
      },
      {
        title: "Security Engineer",
        years: "2–5",
        icon: <ShieldCheck />,
        description: "Implements secure systems",
      },
      {
        title: "Security Architect",
        years: "5–8",
        icon: <ShieldCheck />,
        description: "Designs enterprise-level security",
      },
      {
        title: "Chief Information Security Officer (CISO)",
        years: "8+",
        icon: <Brain />,
        description: "Leads org-wide security strategy",
      },
    ],
  },
  {
    track: "Full Stack Developer",
    path: [
      {
        title: "Junior Full Stack Dev",
        years: "0–2",
        icon: <Layers3 />,
        description: "Builds features across frontend/backend",
      },
      {
        title: "Full Stack Developer",
        years: "2–5",
        icon: <Layers3 />,
        description: "Delivers full solutions independently",
      },
      {
        title: "Senior Full Stack Dev",
        years: "5–8",
        icon: <Layers3 />,
        description: "Leads end-to-end system design",
      },
      {
        title: "Tech Lead / Architect",
        years: "8+",
        icon: <Brain />,
        description: "Owns architecture across stack",
      },
    ],
  },
  {
    track: "AI/ML Developer",
    path: [
      {
        title: "ML Engineer",
        years: "0–2",
        icon: <Atom />,
        description: "Trains & deploys ML models",
      },
      {
        title: "Senior ML Engineer",
        years: "2–5",
        icon: <Brain />,
        description: "Builds scalable ML systems",
      },
      {
        title: "Applied AI Scientist",
        years: "5–8",
        icon: <Brain />,
        description: "Applies research to real-world problems",
      },
      {
        title: "AI Architect",
        years: "8+",
        icon: <Brain />,
        description: "Leads AI solution strategy & integration",
      },
    ],
  },
  {
    track: "GenAI Developer",
    path: [
      {
        title: "Prompt Engineer",
        years: "0–2",
        icon: <Bot />,
        description: "Crafts effective prompts for LLMs",
      },
      {
        title: "GenAI App Developer",
        years: "2–4",
        icon: <Bot />,
        description: "Builds apps with LLMs & APIs",
      },
      {
        title: "GenAI Solutions Engineer",
        years: "4–7",
        icon: <Bot />,
        description: "Designs scalable GenAI systems",
      },
      {
        title: "LLM Architect",
        years: "7+",
        icon: <Brain />,
        description: "Customizes & fine-tunes foundational models",
      },
    ],
  },
];
