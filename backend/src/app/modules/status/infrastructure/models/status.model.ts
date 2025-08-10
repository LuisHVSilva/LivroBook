import {
    DataType,
    Model,
    PrimaryKey,
    AutoIncrement,
    AllowNull,
    Table,
    Default,
    CreatedAt,
    UpdatedAt,
    Unique
} from "sequelize-typescript";

import {CreationOptional, InferAttributes, InferCreationAttributes} from "sequelize";
import {DbColumn} from "@coreShared/decorators/dbColumn";
import {IStatusModel} from "@status/infrastructure/models/interfaces/IStatus.model";


@Table({tableName: "status", timestamps: true})
class StatusModel extends Model<InferAttributes<StatusModel>, InferCreationAttributes<StatusModel>> implements IStatusModel {
    @PrimaryKey
    @AutoIncrement
    @AllowNull(false)
    @DbColumn(DataType.INTEGER)
    declare id: CreationOptional<number>;

    @AllowNull(false)
    @Unique
    @DbColumn(DataType.STRING(50))
    declare description: string;

    @AllowNull(false)
    @Default(false)
    @DbColumn(DataType.BOOLEAN)
    declare active: CreationOptional<boolean>;

    @CreatedAt
    @DbColumn(DataType.DATE)
    declare createdAt?: Date;

    @UpdatedAt
    @DbColumn(DataType.DATE)
    declare updatedAt?: Date;
}

export {StatusModel};