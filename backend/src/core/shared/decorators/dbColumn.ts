import { Column } from "sequelize-typescript";
import { DataType } from "sequelize";
import { ColumnOptions } from "sequelize/types";


export function camelToSnakeLower(str: string): string {
    return str.replace(/([a-z])([A-Z])/g, '$1_$2').toLowerCase();
}

export function DbColumn(type: DataType, options: Partial<ColumnOptions> = {}) {
    return function (target: any, propertyKey: string) {
        Column({
            type,
            field: camelToSnakeLower(propertyKey),
            ...options,
        })(target, propertyKey);
    };
}
