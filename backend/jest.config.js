/** @type {import('ts-jest').JestConfigWithTsJest} */

module.exports = {
    testEnvironment: "node",
    transform: {
        "^.+\\.tsx?$": ["ts-jest", {}],
    },
    moduleFileExtensions: ["js", "ts"],
    testTimeout: 30000,
    testPathIgnorePatterns: ["/node_modules/", "/dist/", "/src/core/config/", "/src/framework/"],

    moduleNameMapper: {
        "^@status/(.*)$": "<rootDir>/src/app/modules/status/$1",
        "^@coreConfig/(.*)$": "<rootDir>/src/core/config/$1",
        "^@coreShared/(.*)$": "<rootDir>/src/core/shared/$1",
        "^@frameworkHttp/(.*)$": "<rootDir>/src/framework/http/$1",
        "^@payloads/(.*)$": "<rootDir>/tests/__payloads__/$1",
        "^@testHelpers/(.*)$": "<rootDir>/tests/helpers/$1",
        "^@mocks/(.*)$": "<rootDir>/tests/__mocks__/$1",
    },

    clearMocks: true,
    resetMocks: true,
    restoreMocks: true,

    collectCoverage: false,
    collectCoverageFrom: [
        "src/**/*.ts",
        "!src/**/*.d.ts"
    ],
    coverageDirectory: "./tests/coverage",
    coverageReporters: ["lcov"],
};
