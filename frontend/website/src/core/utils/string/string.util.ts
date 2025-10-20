export class StringUtil {
    public capitalizeFirstLetter(text: string) {
        if (!text) return "";
        const [first, ...rest] = text;
        return `${first.toUpperCase()}${rest.join("")}`;
    }

    public convertStringToInt(text: string | unknown | undefined): number | undefined {
        return this.checkNullString(text) ? Number(text) : undefined;
    }

    public checkNullString(text: string | unknown |undefined): string | undefined {
        if (!text || text === "") {
            return undefined;
        }
        return String(text);
    }

    public convertStringToBoolean(text: string | unknown | undefined): boolean | undefined {
        return this.checkNullString(text) ? text === "true" : undefined;
    }
}

export const stringUtil = new StringUtil();