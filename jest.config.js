/** @type {import('jest').Config} */
module.exports = {
  roots: ["<rootDir>/src", "<rootDir>/__mocks__"],
  testMatch: ["<rootDir>/src/**/*.test.{ts,tsx}"],
  testEnvironment: "jsdom",
  transform: {
    "^.+\\.tsx?$": [
      "ts-jest",
      {
        tsconfig: {
          jsx: "react-jsx",
          module: "commonjs",
        },
      },
    ],
  },
  moduleNameMapper: {
    "^@/(.*)$": "<rootDir>/src/$1",
    "^server-only$": "<rootDir>/__mocks__/server-only.js",
  },
  setupFilesAfterEnv: ["<rootDir>/src/test/setup.ts"],
};
