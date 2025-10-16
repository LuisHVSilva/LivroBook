export const StatusEnum = {
    ACTIVE: 'ACTIVE',
} as const;

export type StatusEnum = typeof StatusEnum[keyof typeof StatusEnum];
