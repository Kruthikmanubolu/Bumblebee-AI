import { Inngest } from "inngest";

export const inngest = new Inngest({
  id: "bumblebee",
  name: "BumbleBee",
  credentials: {
    gemini: {
      apiKey: process.env.GEMINI_API_KEY,
    },
  },
});
