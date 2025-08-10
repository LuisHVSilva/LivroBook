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
import {IStateModel} from "@location/infrastructure/models/interfaces/IState.model";
import {StatusModel} from "@status/infrastructure/models/status.model";
import {CountryModel} from "@location/infrastructure/models/country.model";

@Table({tableName: "state", timestamps: true})
class StateModel extends Model<InferAttributes<StateModel>, InferCreationAttributes<StateModel>> implements IStateModel {
    @PrimaryKey
    @AutoIncrement
    @AllowNull(false)
    @DbColumn(DataType.INTEGER)
    declare id: CreationOptional<number>;

    @AllowNull(false)
    @Unique
    @DbColumn(DataType.STRING(255))
    declare description: string;

    @ForeignKey(() => CountryModel)
    @AllowNull(false)
    @DbColumn(DataType.INTEGER)
    declare countryId: number;

    @ForeignKey(() => StatusModel)
    @AllowNull(false)
    @DbColumn(DataType.INTEGER)
    declare statusId: number;

    @BelongsTo(() => StatusModel)
    status?: StatusModel;

    @BelongsTo(() => CountryModel)
    country?: CountryModel;

    @CreatedAt
    @DbColumn(DataType.DATE)
    declare createdAt?: Date;

    @UpdatedAt
    @DbColumn(DataType.DATE)
    declare updatedAt?: Date;
}

export {StateModel};