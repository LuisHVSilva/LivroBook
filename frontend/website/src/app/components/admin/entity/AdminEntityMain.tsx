import {useEffect, useState} from "react";
import AdminEntityListData, {type EntityInfo} from "./AdminEntityListData.tsx";
import {EditableOptionsEnum} from "../../../../core/models/enums/editableOptions.enum.ts";
import type {onRowClickType} from "../../Table.tsx";
import AdminEntityEditData from "./AdminEntityEditData.tsx";
import AdminEntityAddData from "./AdminEntityAddData.tsx";

type AdminEntityMainProps = {
    selectedEntities: EntityInfo;
}

const AdminEntityMain = ({selectedEntities}: AdminEntityMainProps) => {
    const [selectedRowId, setSelectedRowId] = useState<number | null>(null);
    const [selectedOption, setSelectedOption] = useState<string>(EditableOptionsEnum.LIST);

    useEffect(() => {
        setSelectedOption(EditableOptionsEnum.LIST);
        setSelectedRowId(null);
    }, [selectedEntities]);

    const onRowClick = (data: onRowClickType) => {
        setSelectedRowId(data.id);
        setSelectedOption(data.option);
    }

    return (
        <>
            <p className="h1">{selectedEntities.name}</p>
            {selectedOption === EditableOptionsEnum.LIST && (
                <AdminEntityListData
                    selectedEntities={selectedEntities}
                    onRowClick={(row) => onRowClick(row)}
                    setSelectedOption={setSelectedOption}
                />
            )}

            {selectedOption === EditableOptionsEnum.EDIT && selectedRowId !== null && (
                <AdminEntityEditData
                    entityId={selectedRowId}
                    entity={selectedEntities}
                />
            )}

            {selectedOption === EditableOptionsEnum.ADD && (
                <AdminEntityAddData />
            )}
        </>
    )
}

export default AdminEntityMain;