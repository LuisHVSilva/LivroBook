type SelectFieldProps<T> = {
    name: string;
    label: string;
    options: T[];
    getValue?: (opt: T) => string | number;
    getLabel?: (opt: T) => string | number;
    onChange?: (value: string) => void;
};

function SelectField<T extends string | number | { [key: string]: any }>({
                                                                             name,
                                                                             label,
                                                                             options,
                                                                             getValue,
                                                                             getLabel,
                                                                             onChange
                                                                         }: SelectFieldProps<T>) {
    const valueFn = getValue ?? ((opt: any) => String(opt));
    const labelFn = getLabel ?? ((opt: any) => String(opt));

    return (
        <select name={name} id={name} onChange={(e) => onChange?.(e.target.value)}>
            <option value="">{label}</option>
            {options.map((opt) => (
                <option key={valueFn(opt)} value={valueFn(opt)}>
                    {labelFn(opt)}
                </option>
            ))}
        </select>
    );
}

export default SelectField;