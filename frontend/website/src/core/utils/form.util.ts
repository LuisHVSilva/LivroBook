import {NullFieldError, ValidationError} from "../errors/generic.error.ts";
import {errorMessage} from "../constants/messages/error.message.ts";
import {t} from "../constants/messages/translations.ts";

export class FormUtil {
    public getFormValue(formData: FormData, key: string): string {
        const value: FormDataEntryValue | null = formData.get(key);
        if (value === null || value === "") {
            throw new NullFieldError(t(errorMessage.nullFieldError.required, {field: key}));
        }
        return value.toString();
    }

    public getFormNumber(formData: FormData, key: string): number {
        const value: FormDataEntryValue | null = formData.get(key);
        if (value === null) {
            throw new NullFieldError(t(errorMessage.nullFieldError.required, {field: key}));
        }
        const num = Number(value);
        if (isNaN(num)) {
            throw new ValidationError(`Campo ${key} precisa ser numérico`);
        }
        return num;
    }

    public getOptionalValue(formData: FormData, key: string): string | undefined {
        return formData.get(key)?.toString();
    }
}

export const formUtil = new FormUtil();