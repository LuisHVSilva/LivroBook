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
    ForeignKey, BelongsTo
} from "sequelize-typescript";

import {CreationOptional, InferAttributes, InferCreationAttributes} from "sequelize";
import {DbColumn} from "@coreShared/decorators/dbColumn";
import {IUserCredentialModel} from "@user/infrastructure/models/interfaces/IUserCredential.model";
import {StatusModel} from "@status/infrastructure/models/status.model";
import {UserCredentialTypeModel} from "@user/infrastructure/models/userCredentialType.model";
import {UserModel} from "@user/infrastructure/models/user.model";

@Table({tableName: "user_credential", timestamps: true})
class UserCredentialModel extends Model<InferAttributes<UserCredentialModel>, InferCreationAttributes<UserCredentialModel>> implements IUserCredentialModel {
    @PrimaryKey
    @AutoIncrement
    @AllowNull(false)
    @DbColumn(DataType.INTEGER)
    declare id: CreationOptional<number>;

    @ForeignKey(() => UserModel)
    @AllowNull(false)
    @DbColumn(DataType.INTEGER)
    declare userId: number;

    @AllowNull(true)
    @DbColumn(DataType.STRING)
    declare password?: string;

    @AllowNull(false)
    @Default(0)
    @DbColumn(DataType.INTEGER)
    declare loginAttempts: number;

    @AllowNull(true)
    @DbColumn(DataType.STRING(39))
    declare lastLoginIp?: CreationOptional<string>;

    @AllowNull(true)
    @DbColumn(DataType.DATE)
    declare lastLoginAt: CreationOptional<Date>;

    @ForeignKey(() => UserCredentialTypeModel)
    @AllowNull(false)
    @DbColumn(DataType.INTEGER)
    declare userCredentialTypeId: number;

    @ForeignKey(() => StatusModel)
    @AllowNull(true)
    @DbColumn(DataType.INTEGER)
    declare statusId: number;

    @BelongsTo(() => UserModel, {as: "user"})
    user?: UserModel;

    @BelongsTo(() => UserCredentialTypeModel, {as: "userCredentialType"})
    userCredentialType?: UserCredentialTypeModel;

    @BelongsTo(() => StatusModel, {as: "status"})
    status?: StatusModel;

    @CreatedAt
    @DbColumn(DataType.DATE)
    declare createdAt?: Date;

    @UpdatedAt
    @DbColumn(DataType.DATE)
    declare updatedAt?: Date;
}

export {UserCredentialModel};