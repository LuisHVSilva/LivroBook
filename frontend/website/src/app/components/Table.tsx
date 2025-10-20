import {EditableOptionsEnum} from "../../core/models/enums/editableOptions.enum.ts";

export type Renderable = string | number | boolean | null | undefined;

export type onRowClickType = {
    id: number,
    option: EditableOptionsEnum;
}

type TableProps<T extends { id: number } & Record<string, Renderable>, K extends keyof T = keyof T> = {
    headers: K[];
    rows: T[];
    onRowClick: (clickData: onRowClickType) => void;
};

function Table<T extends { id: number } & Record<string, Renderable>, K extends keyof T = keyof T>(
    {headers, rows, onRowClick}: TableProps<T, K>
) {
    return (
        <table>
            <thead>
            <tr>
                {headers.map((h) => (
                    <th
                        key={String(h)}
                    >
                        {String(h).toUpperCase()}
                    </th>
                ))}
            </tr>
            </thead>
            <tbody>
            {rows.map((row, rowIdx) => (
                <tr key={rowIdx}
                    onClick={() =>
                        onRowClick({id: row.id ?? null, option: EditableOptionsEnum.EDIT})
                    }
                >
                    {Object.values(row).map((value, colIdx) => {
                        if (typeof value === "object" && value !== null) {
                            return Object.keys(value).map((key) => (
                                <td key={`${colIdx}-${key}`}>{String(value[key])}</td>
                            ));
                        } else {
                            return <td key={colIdx}>{String(value)}</td>;
                        }
                    })}
                </tr>
            ))}
            </tbody>

        </table>
    );
}

export default Table;
