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
    ForeignKey,
    BelongsTo
} from "sequelize-typescript";

import {CreationOptional, InferAttributes, InferCreationAttributes} from "sequelize";
import {ICityModel} from "@location/infrastructure/models/interfaces/ICity.model";
import {DbColumn} from "@coreShared/decorators/dbColumn";
import {StateModel} from "@location/infrastructure/models/state.model";
import {StatusModel} from "@status/infrastructure/models/status.model";

@Table({tableName: "city", timestamps: true})
class CityModel extends Model<InferAttributes<CityModel>, InferCreationAttributes<CityModel>> implements ICityModel {
    @PrimaryKey
    @AutoIncrement
    @AllowNull(false)
    @DbColumn(DataType.INTEGER)
    declare id: CreationOptional<number>;

    @AllowNull(false)
    @Unique
    @DbColumn(DataType.STRING(255))
    declare description: string;

    @ForeignKey(() => StateModel)
    @AllowNull(false)
    @DbColumn(DataType.INTEGER)
    declare stateId: number;

    @ForeignKey(() => StatusModel)
    @AllowNull(false)
    @DbColumn(DataType.INTEGER)
    declare statusId: number;

    @BelongsTo(() => StateModel, {as: 'state'})
    state?: StateModel;

    @BelongsTo(() => StatusModel, {as: 'status'})
    status?: StatusModel;

    @CreatedAt
    @DbColumn(DataType.DATE)
    declare createdAt?: Date;

    @UpdatedAt
    @DbColumn(DataType.DATE)
    declare updatedAt?: Date;
}

export {CityModel};