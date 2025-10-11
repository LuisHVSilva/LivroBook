import {
    DataType,
    Model,
    PrimaryKey,
    AutoIncrement,
    AllowNull,
    Table,
    CreatedAt,
    UpdatedAt,
    Unique,
    ForeignKey, BelongsTo
} from "sequelize-typescript";

import {CreationOptional, InferAttributes, InferCreationAttributes} from "sequelize";
import {DbColumn} from "@coreShared/decorators/dbColumn";
import {IPhoneModel} from "@phone/infrastructure/models/interfaces/IPhone.model";
import {StatusModel} from "@status/infrastructure/models/status.model";
import {PhoneTypeModel} from "@phone/infrastructure/models/phoneType.model";
import {PhoneCodeModel} from "@phone/infrastructure/models/phoneCode.model";

@Table({tableName: "phone", timestamps: true})
class PhoneModel extends Model<InferAttributes<PhoneModel>, InferCreationAttributes<PhoneModel>> implements IPhoneModel {
    @PrimaryKey
    @AutoIncrement
    @AllowNull(false)
    @DbColumn(DataType.INTEGER)
    declare id: CreationOptional<number>;

    @AllowNull(false)
    @Unique
    @DbColumn(DataType.STRING(20))
    declare number: string;

    @ForeignKey(() => PhoneCodeModel)
    @AllowNull(false)
    @DbColumn(DataType.INTEGER)
    declare phoneCodeId: number;

    @ForeignKey(() => PhoneTypeModel)
    @AllowNull(false)
    @DbColumn(DataType.INTEGER)
    declare phoneTypeId: number;

    @ForeignKey(() => StatusModel)
    @AllowNull(false)
    @DbColumn(DataType.INTEGER)
    declare statusId: number;

    @BelongsTo(() => PhoneCodeModel, {as: 'phoneCode'})
    phoneCode?: PhoneCodeModel;

    @BelongsTo(() => PhoneTypeModel, {as: 'phoneType'})
    phoneType?: PhoneTypeModel;

    @BelongsTo(() => StatusModel, {as: 'status'})
    status?: StatusModel;

    @CreatedAt
    @DbColumn(DataType.DATE)
    declare createdAt?: Date;

    @UpdatedAt
    @DbColumn(DataType.DATE)
    declare updatedAt?: Date;
}

export {PhoneModel};