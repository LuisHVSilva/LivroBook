/** @type {import('ts-jest').JestConfigWithTsJest} */

module.exports = {
    testEnvironment: "node",
    transform: {
        "^.+\\.tsx?$": ["ts-jest", {}],
    },
    moduleFileExtensions: ["js", "ts"],
    testTimeout: 30000,
    testPathIgnorePatterns: ["/node_modules/", "/dist/"],
    moduleNameMapper: {
        "^@status/(.*)$": "<rootDir>/src/app/modules/status/$1",
        "^@coreConfig/(.*)$": "<rootDir>/src/core/config/$1",
        "^@coreShared/(.*)$": "<rootDir>/src/core/shared/$1",
        "^@frameworkHttp/(.*)$": "<rootDir>/src/framework/http/$1",
        "^@payloads/(.*)$": "<rootDir>/tests/payloads/$1",
        "^@testHelpers/(.*)$": "<rootDir>/tests/helpers/$1",
    },

    clearMocks: true,
    resetMocks: true,
    restoreMocks: true,

    collectCoverage: false,
    collectCoverageFrom: [
        "src/**/*.ts",  // Agora ele vai coletar cobertura de todos os arquivos .ts dentro de src
        "!src/**/*.d.ts" // Exclui os arquivos de definição de tipos (.d.ts)
    ],
    coverageDirectory: "./tests/coverage",
    coverageReporters: ["lcov"],
};
