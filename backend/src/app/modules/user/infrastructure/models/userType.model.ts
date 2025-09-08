import {
    DataType,
    Model,
    PrimaryKey,
    AutoIncrement,
    AllowNull,
    Table,
    CreatedAt,
    UpdatedAt,
    Unique, ForeignKey, BelongsTo
} from "sequelize-typescript";

import {CreationOptional, InferAttributes, InferCreationAttributes} from "sequelize";
import {DbColumn} from "@coreShared/decorators/dbColumn";
import {IUserTypeModel} from "@user/infrastructure/models/interfaces/IUserType.model";
import {StatusModel} from "@status/infrastructure/models/status.model";

@Table({tableName: "user_type", timestamps: true})
class UserTypeModel extends Model<InferAttributes<UserTypeModel>, InferCreationAttributes<UserTypeModel>> implements IUserTypeModel {
    @PrimaryKey
    @AutoIncrement
    @AllowNull(false)
    @DbColumn(DataType.INTEGER)
    declare id: CreationOptional<number>;

    @AllowNull(false)
    @Unique
    @DbColumn(DataType.STRING(50))
    declare description: string;

    @ForeignKey(() => StatusModel)
    @AllowNull(false)
    @DbColumn(DataType.INTEGER)
    declare statusId: number;


    @BelongsTo(() => StatusModel)
    status?: StatusModel;

    @CreatedAt
    @DbColumn(DataType.DATE)
    declare createdAt?: Date;

    @UpdatedAt
    @DbColumn(DataType.DATE)
    declare updatedAt?: Date;
}

export {UserTypeModel};