import {stringUtil} from "../../core/utils/string.util.ts";
import React, {useState} from "react";

type InputFieldProps = {
    name: string;
    type: string;
    placeHolder?: string;
    required?: boolean;
    onChangeFunction?: (value: string) => void;
    hasError?: boolean;
}

const InputField = ({name, type, placeHolder, required, onChangeFunction,hasError}: InputFieldProps) => {
    const [value, setValue] = useState("");
    const filled: boolean = value.length > 0;

    const placeHolderCapitalized: string = placeHolder ?
        stringUtil.capitalizeFirstLetter(placeHolder) :
        stringUtil.capitalizeFirstLetter(name);

    const fieldDescription: string = required ? '* ' + placeHolderCapitalized : placeHolderCapitalized;

    const handleChange = (e: React.ChangeEvent<HTMLInputElement>) => {
        const val = e.target.value;
        setValue(val);
        if (onChangeFunction) onChangeFunction(val);
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
            />
        </div>
    )
}

export default InputField;