import {
    DataType,
    Model,
    PrimaryKey,
    AutoIncrement,
    AllowNull,
    Table,
    CreatedAt,
    UpdatedAt,
    Unique, ForeignKey, BelongsTo,
} from "sequelize-typescript";

import {CreationOptional, InferAttributes, InferCreationAttributes} from "sequelize";
import {DbColumn} from "@coreShared/decorators/dbColumn";
import {IPhoneCodeModel} from "@phone/infrastructure/models/interfaces/IPhoneCode.model";
import {StatusModel} from "@status/infrastructure/models/status.model";
import {StateModel} from "@location/infrastructure/models/state.model";

@Table({tableName: "phone_code", timestamps: true})
class PhoneCodeModel extends Model<InferAttributes<PhoneCodeModel>, InferCreationAttributes<PhoneCodeModel>> implements IPhoneCodeModel {
    @PrimaryKey
    @AutoIncrement
    @AllowNull(false)
    @DbColumn(DataType.INTEGER)
    declare id: CreationOptional<number>;

    @AllowNull(false)
    @Unique
    @DbColumn(DataType.NUMBER)
    declare ddiCode: number;

    @AllowNull(false)
    @Unique
    @DbColumn(DataType.NUMBER)
    declare dddCode: number;

    @ForeignKey(() => StateModel)
    @AllowNull(false)
    @DbColumn(DataType.INTEGER)
    declare stateId: number;

    @ForeignKey(() => StatusModel)
    @AllowNull(false)
    @DbColumn(DataType.INTEGER)
    declare statusId: number

    @BelongsTo(() => StateModel)
    state?: StateModel;

    @BelongsTo(() => StatusModel)
    status?: StatusModel;

    @CreatedAt
    @DbColumn(DataType.DATE)
    declare createdAt?: Date;

    @UpdatedAt
    @DbColumn(DataType.DATE)
    declare updatedAt?: Date;
}

export {PhoneCodeModel};