module.exports = {
  transform: {
    "^.+\\.ts?$": "ts-jest",
  },
  testEnvironment: "node",
  testRegex: "./tests/.*\\.(test|spec)?\\.(ts|ts)$",
  moduleFileExtensions: ["ts", "js", "json", "node"],
  roots: ["<rootDir>"],
  setupFilesAfterEnv: ["<rootDir>/tests/unit/jest.setup.ts"],
};
