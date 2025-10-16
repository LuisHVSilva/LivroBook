import {stringUtil} from "../../../core/utils/string.util.ts";

type SelectFieldProps<T> = {
    name: string;
    label: string;
    options: T[];
    getValue?: (opt: T) => string | number;
    getLabel?: (opt: T) => string | number;
    onChange?: (value: string) => void;
};

function SelectField<T extends string | number | { [key: string]: unknown }>({
                                                                                 name,
                                                                                 label,
                                                                                 options,
                                                                                 getValue,
                                                                                 getLabel,
                                                                                 onChange
                                                                             }: SelectFieldProps<T>) {
    const valueFn = getValue ?? ((opt: unknown) => String(opt));
    const labelFn = getLabel ?? ((opt: unknown) => String(opt));
    const filled: boolean = options !== undefined && options !== null && options.length > 0;

    const placeHolderCapitalized: string = stringUtil.capitalizeFirstLetter(name);

    return (
        <div className={`input-field`}>
            <label htmlFor={name} className={filled ? 'filled' : ''}>
                {placeHolderCapitalized}:
            </label>
            <select name={name} id={name} onChange={(e) => onChange?.(e.target.value)}>
                <option value="">{label}</option>
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