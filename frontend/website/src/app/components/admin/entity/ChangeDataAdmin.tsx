import InputField from "../../forms/InputField.tsx";
import type {EntityProperty, GetAllModelAttributesResponseDTO} from "../../../../core/api/types/admin.type.ts";

type changeDataAdminInput = {
    entityProperties: GetAllModelAttributesResponseDTO
}

const ChangeDataAdmin = ({entityProperties}: changeDataAdminInput) => {

    const getInputFieldProps = (prop: EntityProperty) => {
        let type: string;
        let disabled: boolean = false;

        if (prop.columnName === "id" || prop.columnName === "createdAt" || prop.columnName === "updatedAt") {
            disabled = true;
        }

        switch (prop.dataType) {
            case "INTEGER":
                type = "number";
                break;
            case "DATE":
                type = "date";
                break;
            case "STRING":
                type = "text";
                break;
            default:
                type = "text";
        }

        return {type, disabled};
    };

    const buildPropsTable = () => {
        const filteredProps = entityProperties.filter(
            (prop) => prop.columnName !== "createdAt" && prop.columnName !== "updatedAt" && prop.columnName !== "id"
        );

        return (
            <>
                {filteredProps.map((prop) => {
                    const {type, disabled} = getInputFieldProps(prop);

                    return (
                        <div key={prop.columnName} className="entity-prop">
                            <InputField
                                name={prop.columnName}
                                dbType={type}
                                placeHolder={prop.columnName}
                                required={!prop.allowNull}
                                disabled={disabled}
                            />
                        </div>
                    );
                })}
            </>
        );
    };

    return (
        <>
            {buildPropsTable()}
        </>
    )
}

export default ChangeDataAdmin;