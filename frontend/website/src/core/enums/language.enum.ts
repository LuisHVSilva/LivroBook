export const LanguageEnum = {
    ENGLISH: 'en-US',
    PORTBR: 'pt-BR',
} as const;

export type LanguageEnum = typeof LanguageEnum[keyof typeof LanguageEnum];
