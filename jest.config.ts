/*
 * For a detailed explanation regarding each configuration property and type check, visit:
 * https://jestjs.io/docs/configuration
 */

export default {
  preset: 'ts-jest',
  testEnvironment: 'node',

  collectCoverage: false,
  coverageDirectory: "coverage",
  coverageProvider: "v8",
  coverageThreshold: {
    global: {
      branches: 80,
      functions: 80,
      lines: 80,
      statements: 80,
    }
  },
  // coverageReporters: [
  //   "json",
  //   "text",
  //   "lcov",
  //   "clover"
  // ],

  errorOnDeprecated: true,
  moduleFileExtensions: [
    "js",
    "ts",
  ],
  slowTestThreshold: 2,
  modulePathIgnorePatterns: [
      "dist",
  ],
};
