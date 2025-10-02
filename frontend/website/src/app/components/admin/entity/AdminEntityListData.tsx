import {useState} from "react";
import {useFindAllEntityData} from "../../../../core/hooks/admin.hook.ts";
import Table, {type onRowClickType} from "../../Table.tsx";
import type {GetEntityByIdResponseDTO} from "../../../../core/api/types/admin.type.ts";

export type EntityInfo = {
    name: string;
    selectedEntities: string;
};

type ListEntityDataProps = {
    selectedEntities: EntityInfo;
    onRowClick: (row: onRowClickType) => void
};

const AdminEntityListData = ({selectedEntities, onRowClick}: ListEntityDataProps) => {
    const [page, setPage] = useState<number>(1);
    const {data: entityDatas} = useFindAllEntityData(selectedEntities.selectedEntities, page);

    const headers: string[] = entityDatas ? Object.keys(entityDatas.data[0]) : [];
    const rows: GetEntityByIdResponseDTO[] = entityDatas?.data ?? [];

    const handleOnChangePage = (action: "next" | "prev") => {
        if (action === "next") {
            setPage((prev) => prev + 1);
        }
        if (action === "prev") {
            setPage((prev) => Math.max(1, prev - 1)); // evita página 0
        }
    };


    return (
        <>
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
