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
import {DbColumn} from "@coreShared/decorators/dbColumn";
import {StatusModel} from "@status/infrastructure/models/status.model";
import {IAuthorModel} from "@modules/book/infrastructure/models/interfaces/IAuthor.model";

@Table({tableName: "author", timestamps: true})
class AuthorModel extends Model<InferAttributes<AuthorModel>, InferCreationAttributes<AuthorModel>> implements IAuthorModel {
    @PrimaryKey
    @AutoIncrement
    @AllowNull(false)
    @DbColumn(DataType.INTEGER)
    declare id: CreationOptional<number>;

    @AllowNull(false)
    @Unique
    @DbColumn(DataType.STRING())
    declare name: string;

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

export {AuthorModel};