import {
    DataType,
    Model,
    PrimaryKey,
    AutoIncrement,
    AllowNull,
    Column,
    Table,
    Default,
    CreatedAt,
    UpdatedAt
} from "sequelize-typescript";

import {CreationOptional, InferAttributes, InferCreationAttributes} from "sequelize";
import {Database} from "../../../../../core/config/database";
import {IStatusEntity} from "../interface/IStatusEntity";

const sequelize = Database.getInstance();

@Table({tableName: "STATUS", timestamps: true})
class StatusModel extends Model<InferAttributes<StatusModel>, InferCreationAttributes<StatusModel>> implements IStatusEntity {
    @PrimaryKey
    @AutoIncrement
    @AllowNull(false)
    @Column(DataType.INTEGER)
    declare id: CreationOptional<number>;

    @AllowNull(false)
    @Column(DataType.STRING)
    declare description: string;

    @AllowNull(false)
    @Default(false)
    @Column(DataType.BOOLEAN)
    declare active: CreationOptional<boolean>;

    @CreatedAt
    @Column(DataType.DATE)
    declare createdAt?: Date;

    @UpdatedAt
    @Column(DataType.DATE)
    declare updatedAt?: Date;
}

sequelize.addModels([StatusModel]);

export {StatusModel};

