/** @type {import('jest').Config} */
module.exports = {
  testEnvironment: "jsdom",
  setupFilesAfterEnv: ["<rootDir>/src/test/setup.ts"],
  moduleFileExtensions: ["ts", "tsx", "js", "jsx"],
  transform: {
    "^.+\\.(ts|tsx)$": [
      "ts-jest",
      { tsconfig: "<rootDir>/tsconfig.jest.json", diagnostics: false },
    ],
  },
  testMatch: [
    "**/__tests__/**/*.(test|spec).(ts|tsx)",
    "**/?(*.)+(spec|test).(ts|tsx)",
  ],
};
