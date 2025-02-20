/** @type {import('ts-jest').JestConfigWithTsJest} **/
module.exports = {
  testEnvironment: "node",
  transform: {
    "^.+.tsx?$": ["ts-jest",{}],
  },
  moduleFileExtensions: ['js', 'ts'],
  testTimeout: 30000, 
  testPathIgnorePatterns: ['/node_modules/', '/dist/'],
  
   collectCoverage: true,
   collectCoverageFrom: [
     "src/**/*.{js,ts}",
     "!src/!**/!*.d.ts"
  ],
  coverageDirectory: "./tests/coverage",
  // coverageReporters: ["text", "lcov", "json"],
  coverageReporters: ["lcov"],
};