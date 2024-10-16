module.exports = {
  testEnvironment: "node",
  setupFilesAfterEnv: ["<rootDir>/tests/jest.setup.js"],
  testPathIgnorePatterns: ["/node_modules/", "/dist/"],
  moduleDirectories: ["node_modules", "src"],
  moduleNameMapper: {
    "^src/(.*)$": "<rootDir>/src/$1",
    "^tests/(.*)$": "<rootDir>/tests/$1",
  },
  coverageDirectory: "<rootDir>/coverage",
  collectCoverageFrom: ["src/**/*.js", "!src/**/*.test.js", "!src/index.js"],
  verbose: true,
  reporters: [
    "default",
    "jest-summary-reporter",
    [
      "jest-html-reporter",
      {
        pageTitle: "Test Report",
        outputPath: "./test-report.html",
        includeFailureMsg: true,
      },
    ],
  ],
};
