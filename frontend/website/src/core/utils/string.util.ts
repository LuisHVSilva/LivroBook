export class StringUtil {
    capitalizeFirstLetter(text: string) {
        if (!text) return "";
        const [first, ...rest] = text;
        return `${first.toUpperCase()}${rest.join("")}`;
    }
}

export const stringUtil = new StringUtil();