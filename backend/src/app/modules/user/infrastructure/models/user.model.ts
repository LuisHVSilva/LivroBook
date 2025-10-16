import {
    DataType,
    Model,
    PrimaryKey,
    AutoIncrement,
    AllowNull,
    Table,
    CreatedAt,
    UpdatedAt, ForeignKey, BelongsTo, Default,
    HasMany
} from "sequelize-typescript";

import {CreationOptional, InferAttributes, InferCreationAttributes} from "sequelize";
import {DbColumn} from "@coreShared/decorators/dbColumn";
import {IUserModel} from "@user/infrastructure/models/interfaces/IUser.model";
import {StatusModel} from "@status/infrastructure/models/status.model";
import {UserTypeModel} from "@user/infrastructure/models/userType.model";
import {CityModel} from "@location/infrastructure/models/city.model";
import {UserCredentialModel} from "@user/infrastructure/models/userCredential.model";
import {DocumentTypeModel} from "@document/infrastructure/models/documentType.model";
import {PhoneModel} from "@phone/infrastructure/models/phone.model";

@Table({tableName: "user", timestamps: true})
class UserModel extends Model<InferAttributes<UserModel>, InferCreationAttributes<UserModel>> implements IUserModel {
    @PrimaryKey
    @AutoIncrement
    @AllowNull(false)
    @DbColumn(DataType.INTEGER)
    declare id: CreationOptional<number>;

    @AllowNull(false)
    @DbColumn(DataType.STRING(100))
    declare name: string;

    @AllowNull(false)
    @DbColumn(DataType.STRING(100))
    declare email: string;

    // @AllowNull(true)
    @DbColumn(DataType.STRING(20))
    declare document?: string;

    @AllowNull(false)
    @DbColumn(DataType.DATEONLY)
    declare birthday: Date;

    @AllowNull(false)
    @Default(false)
    @DbColumn(DataType.BOOLEAN)
    declare isTwoFactorEnable: boolean;

    @AllowNull(false)
    @Default(false)
    @DbColumn(DataType.BOOLEAN)
    declare isEmailVerified: boolean;

    @ForeignKey(() => UserTypeModel)
    @AllowNull(false)
    @DbColumn(DataType.INTEGER)
    declare userTypeId: number;

    @ForeignKey(() => CityModel)
    // @AllowNull(false)
    @DbColumn(DataType.INTEGER)
    declare cityId?: number;

    @ForeignKey(() => DocumentTypeModel)
    // @AllowNull(false)
    @DbColumn(DataType.INTEGER)
    declare documentTypeId?: number;

    @ForeignKey(() => PhoneModel)
    @AllowNull(true)
    @DbColumn(DataType.INTEGER)
    declare phoneId?: CreationOptional<number>;

    @ForeignKey(() => StatusModel)
    @AllowNull(false)
    @DbColumn(DataType.INTEGER)
    declare statusId: number;

    @BelongsTo(() => UserTypeModel, {as: "userType"})
    userType?: UserTypeModel;

    @BelongsTo(() => CityModel, {as: "city"})
    city?: CityModel;

    @BelongsTo(() => DocumentTypeModel, {as: "documentType"})
    documentType?: DocumentTypeModel;

    @BelongsTo(() => PhoneModel, {as: "phone"})
    phone?: PhoneModel;

    @BelongsTo(() => StatusModel, {as: "status"})
    status?: StatusModel;

    @HasMany(() => UserCredentialModel, { as: 'userCredential', foreignKey: "userId" })
    userCredentials?: UserCredentialModel[];

    @CreatedAt
    @DbColumn(DataType.DATE)
    declare createdAt?: Date;

    @UpdatedAt
    @DbColumn(DataType.DATE)
    declare updatedAt?: Date;
}

export {UserModel};