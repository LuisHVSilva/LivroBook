import InputField from "../../forms/InputField.tsx";
import SelectField from "../../forms/SelectField.tsx";
import type {EntityInfo} from "./AdminEntityListData.tsx";
import {formUtil} from "../../../../core/utils/form.util.ts";
import {useAdminEntityEdit} from "../../../../core/hooks/admin.hook.ts";

type AdminEntityDataProps = {
    entityId: number;
    entity: EntityInfo;
};

const AdminEntityEditData = ({entityId, entity}: AdminEntityDataProps) => {
    const {
        entityData,
        preAlterEntityData,
        dbProps,
        handleAlter,
        error,
        success,
    } = useAdminEntityEdit(entity.selectedEntities, entityId);

    if (!entityData || Object.keys(entityData).length === 0) {
        return <h1>Sem valores cadastrados</h1>;
    }

    const makeInputField = (key: string, value: string) => {
        const prop = dbProps?.find(x => x.columnName === key);
        return (
            <InputField
                key={key}
                name={key}
                dbType={prop?.dataType}
                placeHolder={key}
                required={false}
                initialValue={value}
                disabled={key === "id"}
            />
        );
    };

    const makeSelectField = (key: string, value: string, options: string[]) => (
        <SelectField key={key} name={key} label={value} options={options}/>
    );

    return (
        <>
            {error && <p className="text-red-500">{error}</p>}
            {success && <p className="text-green-500">Registro alterado com sucesso</p>}

            <form action={handleAlter}>
                {Object.entries(entityData).map(([key, value]) => {
                    const options = preAlterEntityData && key in preAlterEntityData
                        ? formUtil.getOptionsValueForArrayObject(preAlterEntityData, key, String(value))
                        : null;

                    return options ? makeSelectField(key, String(value), options) : makeInputField(key, String(value));
                })}
                <button type="submit">Alterar</button>
            </form>
        </>
    );
};

export default AdminEntityEditData;
