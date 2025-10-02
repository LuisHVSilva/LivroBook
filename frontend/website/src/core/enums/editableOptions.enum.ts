export const EditableOptionsEnum = {
    LIST: "list",
    ADD: "add",
    EDIT: "edit",
    DELETE: "delete"
} as const;


export type EditableOptionsEnum = typeof EditableOptionsEnum[keyof typeof EditableOptionsEnum];

