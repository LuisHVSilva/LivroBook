export class ServerUtil {
    public buildUrlWithParams<T extends Record<string, string>>(baseUrl: string, params?: Partial<T>): string {
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
}

export const serverUtil = new ServerUtil();
