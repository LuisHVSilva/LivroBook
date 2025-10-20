import {stringUtil} from "../../../core/utils/string/string.util.ts";

type SelectFieldProps<T> = {
    name: string;
    label: string;
    options: T[];
    startValue?: string;
    getValue?: (opt: T) => string | number;
    getLabel?: (opt: T) => string | number;
    onChange?: (value: string) => void;
};

function SelectField<T extends string | number | { [key: string]: unknown }>({
                                                                                 name,
                                                                                 label,
                                                                                 options,
                                                                                 startValue,
                                                                                 getValue,
                                                                                 getLabel,
                                                                                 onChange
                                                                             }: SelectFieldProps<T>) {
    const valueFn = getValue ?? ((opt: unknown) => String(opt));
    const labelFn = getLabel ?? ((opt: unknown) => String(opt));
    const filled: boolean = options !== undefined && options !== null && options.length > 0;

    const placeHolderCapitalized: string = stringUtil.capitalizeFirstLetter(label);
    const optionStartValue: boolean = startValue !== undefined && startValue !== "";

    return (
        <div className={`input-field`}>
            <label htmlFor={name} className={filled ? 'filled' : ''}>
                {placeHolderCapitalized}:
            </label>
            <select name={name} id={name} onChange={(e) => onChange?.(e.target.value)}>
                <option value={optionStartValue ? startValue : ""}>{optionStartValue ? startValue : label}</option>
                {options.map((opt) => (
                    <option key={valueFn(opt)} value={valueFn(opt)}>
                        {labelFn(opt)}
                    </option>
                ))}
            </select>
        </div>
    );
}

export default SelectField;