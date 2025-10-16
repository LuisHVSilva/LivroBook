export class ServerUtil {
    public buildUrlWithParams<T extends Record<string, unknown>>(baseUrl: string, params?: Partial<T>): string {
        if (!params) return baseUrl;

        const query = new URLSearchParams();

        Object.entries(params).forEach(([key, value]) => {
            if (value !== undefined && value !== null && value !== '') {
                query.append(key, String(value));
            }
        });

        const queryString = query.toString();
        return queryString ? `${baseUrl}?${queryString}` : baseUrl;
    }

    getErrorMessage(e: unknown): string {
        if (e instanceof Error) return e.message;
        if (typeof e === "string") return e;
        return "Erro desconhecido";
    }
}

export const serverUtil = new ServerUtil();
