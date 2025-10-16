import {NullFieldError, ValidationError} from "../errors/generic.error.ts";
import {errorMessage} from "../constants/messages/error.message.ts";
import {t} from "../constants/messages/translations.ts";
import {TableEnum} from "../enums/table.enum.ts";
import type {EntityProperty, GetAllModelAttributesResponseDTO} from "../api/types/admin.type.ts";

export class FormUtil {
    public getFormValue(formData: FormData, key: string): string {
        const value: FormDataEntryValue | null = formData.get(key);
        if (value === null || value === "") {
            throw new NullFieldError(t(errorMessage.nullFieldError.required, {field: key}));
        }
        return value.toString();
    }

    public transformFormDataToString(data: Record<string, FormDataEntryValue>): Record<string, string> {
        const result: Record<string, string> = {};

        for (const key in data) {
            const value = data[key];
            if (typeof value === 'string') {
                result[key] = value;
            } else if (value instanceof File) {
                result[key] = value.name;
            }
        }

        return result;
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

    public dbTypeToInputType(dbType: string | undefined, dbColumn?: string): string {
        if (dbType === undefined || dbType === "") {
            return TableEnum.STRING
        }

        const key = dbType.toUpperCase() as keyof typeof TableEnum;

        if (key === "STRING") {
            if (dbColumn?.toLowerCase().includes("email")) {
                return "email";
            }
            if (dbColumn?.toLowerCase().includes("password")) {
                return "password";
            }
        }

        return TableEnum[key] ?? TableEnum.STRING;
    }

    public getAllowNull(columns: GetAllModelAttributesResponseDTO, columnName: string): boolean {
        const column = columns.find(c => c.columnName.replace("Id", "") === columnName);
        return column ? !column.allowNull : false;
    }

    public getOptionsValueForArrayObject(array: Record<string, unknown>, key: string, value: string): string[] {
        const data = array[key] as Record<string, string>[];

        return data
            .map(obj => Object.values(obj)[0])
            .filter(option => !!option && String(option) !== String(value))
            .map(String);
    }

    public getInputTypeFromDbAttributeToEntityName(dbProps: GetAllModelAttributesResponseDTO, entityProp: string): string {
        const dbType: string | undefined = this.getDbPropsByEntityName(dbProps, entityProp)?.dataType;
        return this.dbTypeToInputType(dbType);
    }

    public getError(e: unknown, genericMessage?: string, setError?: (value: string) => void): void {
        if (!(e instanceof Error)) {
            if(setError){
                setError(String(e));
            }
            return;
        }

        if (setError && genericMessage){
            setError(t(genericMessage));
        }


    }

    private getDbPropsByEntityName(dbProps: GetAllModelAttributesResponseDTO, entityProp: string): EntityProperty | undefined {
        return dbProps.find(c =>
            c.columnName.replace("Id", "").toUpperCase() === entityProp.toUpperCase());
    }

}

export const formUtil = new FormUtil();