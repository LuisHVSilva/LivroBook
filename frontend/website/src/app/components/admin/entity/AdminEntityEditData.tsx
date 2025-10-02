import {useGetAllEntityAttributes, useGetEntityById} from "../../../../core/hooks/admin.hook.ts";
import type {EntityInfo} from "./AdminEntityListData.tsx";
import InputField from "../../forms/InputField.tsx";
import {formUtil} from "../../../../core/utils/form.util.ts";

type AdminEntityDataProps = {
    entityId: number;
    entity: EntityInfo;
}


const AdminEntityEditData = ({entityId, entity}: AdminEntityDataProps) => {
    const {data: entityData} = useGetEntityById(entity.selectedEntities, entityId);
    const {data: entityProps} = useGetAllEntityAttributes(entity.selectedEntities);

    if (!entityData || entityData.length === 0 || !entityProps || !entityProps.length) {
        return (
            <>
                <h1>Sem valores cadastrados</h1>
            </>
        )
    }

    return (
        <>
            <form>

            {Object.entries(entityProps).map(([key, value]) => (
                <InputField
                    key={key}
                    name={value.columnName}
                    type={formUtil.dbTypeToInputType(value.dataType, value.columnName)}
                    placeHolder={value.columnName}
                    required={value.allowNull}
                    initialValue={entityData[value.columnName] ?? ""}
                    disabled={value.columnName === "id"}
                />
            ))}
            </form>
        </>
    );

}

export default AdminEntityEditData;
