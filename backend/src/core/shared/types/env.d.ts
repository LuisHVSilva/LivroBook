declare global {
    namespace NodeJS {
        interface ProcessEnv {
            REDIS_URL: string;
            REDIS_PASSWORD?: string;
            REDIS_TTL: string;
        }
    }
}

export {};