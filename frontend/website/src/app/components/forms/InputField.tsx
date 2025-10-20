import {stringUtil} from "../../../core/utils/string/string.util.ts";
import React, {useState} from "react";
import {TableEnum} from "../../../core/models/enums/table.enum.ts";


type InputValueType = string | number | boolean | Date | undefined;

type InputFieldProps = {
    name: string;
    dbType?: string;
    label?: string;
    initialValue?: InputValueType;
    required?: boolean;
    onChangeFunction?: (value: string) => void;
    hasError?: boolean;
    disabled?: boolean;
    hidden?: boolean;
};

const InputField = ({
                        name,
                        dbType,
                        label,
                        required,
                        onChangeFunction,
                        hasError,
                        disabled,
                        initialValue,
                        hidden
                    }: InputFieldProps) => {
    const determineInputType = (): string => {
        if (!dbType) return "text";
        const type = dbType.toLowerCase();

        if (type === TableEnum.DATE || type === TableEnum.DATEONLY) return "date";
        if (type === TableEnum.BOOLEAN) return "checkbox";
        if (type === TableEnum.EMAIL) return "email";
        return "text";
    };

    const inputType = determineInputType();

    const normalizeInitialValue = (value: InputValueType): InputValueType => {
        if (inputType === "date" && value) {
            try {
                const date = new Date(String(value));
                if (!isNaN(date.getTime())) {
                    return date.toISOString().split("T")[0];
                }
            } catch {
                if (typeof value === "string" && /^\d{4}-\d{2}-\d{2}$/.test(value)) {
                    return value;
                }
            }
        }
        if (inputType === "checkbox") {
            return stringUtil.convertStringToBoolean(String(value));
        }
        return value ?? "";
    };

    const [value, setValue] = useState<InputValueType>(
        normalizeInitialValue(initialValue)
    );

    const hideProperty = hidden ?? name === "id";
    const filled: boolean =
        value !== undefined && value !== null && value.toString().length > 0;

    const placeHolderCapitalized: string = label
        ? stringUtil.capitalizeFirstLetter(label)
        : stringUtil.capitalizeFirstLetter(name);

    const fieldDescription: string = required
        ? "* " + placeHolderCapitalized
        : placeHolderCapitalized;

    const wrapperClass: string = [
        "input-field",
        hasError ? "input-field-error" : "",
        hideProperty ? "hidden-div" : ""
    ].filter(Boolean).join(" ");

    const handleChange = (e: React.ChangeEvent<HTMLInputElement>) => {
        let val: string | number | boolean = e.target.value;
        if (inputType === "checkbox") {
            val = e.target.checked;
        }
        setValue(val);
        if (onChangeFunction) onChangeFunction(val.toString());
    };

    return (
        <div className={wrapperClass}>
            <label htmlFor={name} className={filled ? "filled" : ""}>
                {fieldDescription}:
            </label>
            <input
                name={name}
                id={name}
                type={inputType}
                placeholder={fieldDescription}
                onChange={handleChange}
                readOnly={disabled ?? false}
                checked={
                    inputType === "checkbox"
                        ? Boolean(value)
                        : undefined
                }
                value={inputType !== "checkbox" ? String(value ?? "") : ""}
            />
        </div>
    );
};

export default InputField;
