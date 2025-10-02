export const TableEnum = {
    INTEGER: "number",
    STRING: "text",
    DATE: "date",
    EMAIL: "email",
    PASSWORD: "password",
    BOOLEAN: "checkbox",
} as const;


export type TableEnum = typeof TableEnum[keyof typeof TableEnum];

