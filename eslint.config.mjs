import { dirname } from "path";
import { fileURLToPath } from "url";
import { FlatCompat } from "@eslint/eslintrc";

const __filename = fileURLToPath(import.meta.url);
const __dirname = dirname(__filename);

const compat = new FlatCompat({ baseDirectory: __dirname });

export default [
  ...compat.extends("next/core-web-vitals"),
  {
    ignores: [
      "node_modules/",
      ".husky/",
      ".next/",
      "dist/",
      "build/",
      "public/",
      "**/OneDrive*/",
      "*.log",
      "*.config.js",
      "*.test.js",
      "*.spec.js",
    ],
    rules: {
      semi: ["error", "always"],
      quotes: ["error", "double"],
    },
  },
];
