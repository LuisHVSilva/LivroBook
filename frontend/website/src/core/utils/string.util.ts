export class StringUtil {
    public capitalizeFirstLetter(text: string) {
        if (!text) return "";
        const [first, ...rest] = text;
        return `${first.toUpperCase()}${rest.join("")}`;
    }

    public convertStringToInt(text: string): number | undefined {
        return this.checkNullString(text) ? Number(text) : undefined;
    }

    public checkNullString(text: string): string | undefined {
        if (!text || text.length === 0 || text === "") {
            return undefined;
        }
        return String(text);
    }

    public convertStringToBoolean(text: string): boolean | undefined {
        return this.checkNullString(text) ? text === "true" : undefined;
    }
}

export const stringUtil = new StringUtil();