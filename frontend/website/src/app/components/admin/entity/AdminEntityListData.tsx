import "reflect-metadata";
import {useState} from "react";
import Table, {type onRowClickType} from "../../Table.tsx";
import type {FindById} from "../../../../core/models/types/admin.type.ts";
import {useFindAllEntityData} from "../../../hooks/admin/adminQueries.hook.ts";
import {EditableOptionsEnum} from "../../../../core/models/enums/editableOptions.enum.ts";

export type EntityInfo = {
    name: string;
    selectedEntities: string;
};

type ListEntityDataProps = {
    selectedEntities: EntityInfo;
    onRowClick: (row: onRowClickType) => void;
    setSelectedOption: (selectedOption: EditableOptionsEnum) => void;
};

const AdminEntityListData = ({selectedEntities, onRowClick, setSelectedOption}: ListEntityDataProps) => {
    const [page, setPage] = useState<number>(1);
    const {data: entityDatas} = useFindAllEntityData(selectedEntities.selectedEntities, page);
    const entity = entityDatas ? entityDatas.data[0] : null;
    const headers: string[] = entity ? Object.values(Reflect.getMetadata("labels", Object.getPrototypeOf(entity))) || [] : [];
    const rows: FindById<any>[] = entityDatas?.data ? entityDatas?.data.map(obj => obj.getProps()) : [];

    const handleOnChangePage = (action: "next" | "prev") => {
        if (action === "next") {
            setPage((prev) => prev + 1);
        }
        if (action === "prev") {
            setPage((prev) => Math.max(1, prev - 1));
        }
    };

    const handleOnInsert = () => {
        setSelectedOption(EditableOptionsEnum.ADD)
    }


    return (
        <>
            <button onClick={handleOnInsert}>Incluir</button>
            {rows && (
                <Table
                    headers={headers}
                    rows={rows}
                    onRowClick={onRowClick}
                />
            )}

            <div>
                {entityDatas && (
                    <>
                        <button
                            type="submit"
                            disabled={page <= 1}
                            onClick={() => handleOnChangePage("prev")}
                        >
                            Anterior
                        </button>

                        <button
                            type="submit"
                            disabled={page >= entityDatas.page}
                            onClick={() => handleOnChangePage("next")}
                        >
                            Próxima
                        </button>
                    </>
                )}

                <p>{`Página ${page} de ${entityDatas?.page ?? page}`}</p>
            </div>
        </>
    );
};

export default AdminEntityListData;
