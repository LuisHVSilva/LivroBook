/** @type {import('ts-jest').JestConfigWithTsJest} */

module.exports = {
    testEnvironment: "node",
    transform: {
        "^.+\\.tsx?$": ["ts-jest", {}],
    },
    moduleFileExtensions: ["js", "ts"],
    testTimeout: 30000,
    testPathIgnorePatterns: ["/node_modules/", "/dist/", "/src/core/config/", "/src/framework/"],
    setupFiles: ["<rootDir>/tests/setup/jest.setup.ts"],

    moduleNameMapper: {
        "^@status/(.*)$": "<rootDir>/src/app/modules/status/$1",
        "^@location/(.*)$": "<rootDir>/src/app/modules/location/$1",
        "^@document/(.*)$": "<rootDir>/src/app/modules/document/$1",
        "^@phone/(.*)$": "<rootDir>/src/app/modules/phone/$1",
        "^@user/(.*)$": "<rootDir>/src/app/modules/user/$1",
        "^@coreShared/(.*)$": "<rootDir>/src/core/shared/$1",
        "^@coreConfig/(.*)$": "<rootDir>/src/core/config/$1",
        "^@factories/(.*)$": "<rootDir>/tests/__factories__/$1",
    },

    clearMocks: true,
    resetMocks: true,
    restoreMocks: true,

    collectCoverage: true,
    collectCoverageFrom: [
        "src/**/*.ts",
        "!src/**/*.d.ts",
        "!src/core/config/**",
        "!src/framework/**"
    ],
    coverageDirectory: "./tests/coverage",
    coverageReporters: ["lcov"],
};