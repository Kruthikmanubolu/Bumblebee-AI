# 🐝 BumbleBee AI – Your Smart Career Coach

BumbleBee AI is a modern, AI-powered web application designed to help job seekers enhance their careers. Powered by Gemini AI and real-time industry data, BumbleBee AI provides tools to improve resumes, generate personalized cover letters, simulate job interviews, and gain actionable market insights — all wrapped in a secure, scalable, and beautifully designed platform.

---

## 🚀 Features

- ✨ **Resume Enhancer** – Get smart resume suggestions and formatting help.
- 📝 **Cover Letter Generator** – Tailored letters using Gemini AI.
- 🎤 **Interview Prep Assistant** – Practice questions with AI-based feedback.
- 📊 **Industry Insights** – Market data, skill trends, and salary ranges.
- 🔐 **Clerk Auth** – Secure user authentication and profile management.
- 🔄 **Inngest Integration** – Handles async tasks like email reminders, PDF generation, and analytics.

---

## 🧰 Tech Stack

| Technology        | Purpose                                              |
| ----------------- | ---------------------------------------------------- |
| **Next.js**       | React-based fullstack framework                      |
| **JavaScript**    | Language used throughout the app                     |
| **Prisma ORM**    | Type-safe database access layer                      |
| **Neon DB**       | Serverless PostgreSQL database                       |
| **PostgreSQL**    | Primary relational database                          |
| **Gemini AI API** | Google’s LLM for resume, cover letter, and Q&A tasks |
| **Tailwind CSS**  | Utility-first styling framework                      |
| **Clerk**         | Authentication and user management                   |
| **Inngest**       | Event-driven background jobs and scheduling          |

---

## 🛠️ Installation

### 1. Clone the Repository

```bash
git clone https://github.com/yourusername/bumblebee-ai.git
cd bumblebee-ai
```

### 2. Install the dependencies

```bash
npm install
```

### 3. Environmental variables

```bash
DATABASE_URL="your_neon_db_connection_string"
GEMINI_API_KEY="your_gemini_api_key"
NEXTAUTH_SECRET="your_auth_secret"
```

### 4. Prisma db generation and migration

```bash
npx prisma generate
npx prisma migrate dev
```

### 5. Running the application

```bash
npm run dev
```

🤖 Gemini AI Integration
BumbleBee AI uses Gemini AI API to:

🧠 Analyze and improve resume content

🧾 Generate custom cover letters based on role and tone

🎯 Simulate job interviews for user-specific roles

📈 Provide market insights using LLM-powered knowledge

Gemini API is provided by Google. Learn more here.

📣 Acknowledgements

1. Gemini API

2. Next.js

3. Prisma

4. Neon Database

5. Tailwind CSS

6. Zod
