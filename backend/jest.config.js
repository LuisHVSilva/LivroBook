/** @type {import('ts-jest').JestConfigWithTsJest} */
module.exports = {
    testEnvironment: "node",
    transform: {
        "^.+\\.tsx?$": ["ts-jest", {}],
    },
    moduleFileExtensions: ["js", "ts"],
    testTimeout: 30000,
    testPathIgnorePatterns: ["/node_modules/", "/dist/"],

    collectCoverage: true,
    collectCoverageFrom: [
        "src/**/*.ts",  // Agora ele vai coletar cobertura de todos os arquivos .ts dentro de src
        "!src/**/*.d.ts" // Exclui os arquivos de definição de tipos (.d.ts)
    ],
    coverageDirectory: "./tests/coverage",
    coverageReporters: ["lcov"],
};
