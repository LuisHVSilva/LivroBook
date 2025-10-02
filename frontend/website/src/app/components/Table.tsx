import {EditableOptionsEnum} from "../../core/enums/editableOptions.enum.ts";

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
                <tr key={rowIdx}>
                    {headers.map((h) => (
                        <td
                            key={String(h)}
                            onClick={() =>
                                onRowClick({id: row.id, option: EditableOptionsEnum.EDIT})
                            }
                        >
                            {String(row[h])}
                        </td>
                    ))}
                </tr>
            ))}
            </tbody>
        </table>
    );
}

export default Table;
// <tr key={rowIdx}>
//     {headers.map((h) => (
//         <td key={String(h)}>{row[h]}</td>
//     ))}
// </tr>