import InputField from "../components/forms/InputField";
import SelectField from "../components/forms/SelectField";

export const FormFactory = {
    makeInputField: (key: string, label: string, initialValue?: string, dbType?: string, required: boolean = false) => (
        <InputField
            key={key}
            name={key}
            dbType={dbType}
            label={label}
            required={required}
            initialValue={initialValue}
            disabled={key === "id"}
        />
    ),

    makeSelectField: (key: string, label: string, options: string[], startValue?: string) => (
        <SelectField key={key} name={key} label={label} options={options} startValue={startValue} />
    ),
};
