import "reflect-metadata";
import InputField from "../../forms/InputField.tsx";
import SelectField from "../../forms/SelectField.tsx";
import type {EntityInfo} from "./AdminEntityListData.tsx";
import {formUtil} from "../../../../core/utils/form/form.util.ts";
import {useState} from "react";
import {useAdminEntityEdit, useDeleteEntity} from "../../../hooks/admin/adminMutations.hook.ts";

type AdminEntityDataProps = {
    entityId: number;
    entity: EntityInfo;
};

const AdminEntityEditData = ({entityId, entity}: AdminEntityDataProps) => {
    const [error, setError] = useState<string | null>(null);
    const [success, setSuccess] = useState<boolean | null>(null);
    const {
        entityData,
        preAlterEntityData,
        dbProps,
        handleAlter
    } = useAdminEntityEdit(entity.selectedEntities, entityId, setSuccess, setError);
    const deleteEntity = useDeleteEntity(setSuccess, setError);

    if (!entityData || Object.keys(entityData).length === 0) {
        return <h1>Sem valores cadastrados</h1>;
    }

    const makeInputField = (key: string, label: string, value: string) => {
        const prop = dbProps?.find(x => x.columnName === key);
        return (
            <InputField
                key={key}
                name={key}
                dbType={prop?.dataType}
                label={label}
                required={false}
                initialValue={value}
                disabled={key === "id"}
            />
        );
    };

    const makeSelectField = (key: string, label: string, options: string[], startValue?: string) => (
        <SelectField key={key} name={key} label={label} options={options} startValue={startValue} />
    );

    const handleOnDelete = () => {
        deleteEntity.mutate({entityName: entity.selectedEntities, id: entityId});
    };

    return (
        <>
            {error && <p className="text-red-500">{error}</p>}
            {success && <p className="text-green-500">Registro alterado com sucesso</p>}

            <form action={handleAlter}>
                {Object.entries(entityData).map(([key, value]) => {
                    const options = preAlterEntityData && key in preAlterEntityData
                        ? formUtil.getOptionsValueForArrayObject(preAlterEntityData, key, String(value))
                        : null;

                    const label = value.label ?? key;
                    const valueInput = value.value ?? undefined;

                    return options ? makeSelectField(key, label, options, valueInput) : makeInputField(key, label, valueInput);
                })}
                <button type="submit">Alterar</button>
            </form>

            <button onClick={handleOnDelete}>Excluir</button>
        </>
    );
};

export default AdminEntityEditData;
