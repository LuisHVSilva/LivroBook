import {stringUtil} from "../../../core/utils/string.util.ts";
import React, {useState} from "react";

type InputValueType = string | number | boolean | undefined;

type InputFieldProps = {
    name: string;
    type: string;
    placeHolder?: string;
    initialValue?: InputValueType;
    required?: boolean;
    onChangeFunction?: (value: string) => void;
    hasError?: boolean;
    disabled?: boolean;
}

const InputField = ({name, type, placeHolder, required, onChangeFunction, hasError, disabled, initialValue}: InputFieldProps) => {
    const [value, setValue] = useState<InputValueType>(initialValue ?? "");
    const filled: boolean = value !== undefined && value !== null && value.toString().length > 0;

    const placeHolderCapitalized: string = placeHolder ?
        stringUtil.capitalizeFirstLetter(placeHolder) :
        stringUtil.capitalizeFirstLetter(name);

    const fieldDescription: string = required ? '* ' + placeHolderCapitalized : placeHolderCapitalized;

    const handleChange = (e: React.ChangeEvent<HTMLInputElement>) => {
        let val: string | number | boolean = e.target.value;
        if (type === "checkbox") {
            val = e.target.checked;
        }
        setValue(val);
        if (onChangeFunction) onChangeFunction(val.toString());
    };

    return (
        <div className={`input-field ${hasError ? "input-field-error" : ""}`}>
            <label htmlFor={name} className={filled ? 'filled' : ''}>
                {fieldDescription}:
            </label>
            <input
                name={name}
                id={name}
                type={type}
                placeholder={fieldDescription}
                onChange={handleChange}
                disabled={disabled ?? false}
                checked={type === "checkbox" ? Boolean(value) : undefined}
                value={type !== "checkbox" ? (value ? String(value) : "") : ""}
            />
        </div>
    )
}

export default InputField;