export const TableEnum = {
    INTEGER: "number",
    STRING: "text",
    DATE: "date",
    DATEONLY: "dateonly",
    EMAIL: "email",
    PASSWORD: "password",
    BOOLEAN: "boolean",
} as const;


export type TableEnum = typeof TableEnum[keyof typeof TableEnum];

