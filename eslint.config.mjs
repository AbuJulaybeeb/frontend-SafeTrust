import { dirname } from "node:path";
import { fileURLToPath } from "node:url";
import { FlatCompat } from "@eslint/eslintrc";

const compat = new FlatCompat({
  baseDirectory: dirname(fileURLToPath(import.meta.url)),
});

export default [
  ...compat.extends("next/core-web-vitals", "next/typescript"),
  {
    files: ["**/*.{js,jsx,ts,tsx}"],
    ignores: [
      "src/test/**",
      "src/**/*.test.ts",
      "src/**/*.test.tsx",
      "e2e/**",
    ],
    rules: {
      "no-restricted-imports": [
        "error",
        {
          patterns: [
            {
              group: ["@/test", "@/test/**"],
              message:
                "Shared test helpers may only be imported by tests and other test helpers.",
            },
          ],
        },
      ],
    },
  },
];
