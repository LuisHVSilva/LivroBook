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
import {IDocumentTypeModel} from "@document/infrastructure/models/interfaces/IDocumentType.model";
import {DbColumn} from "@coreShared/decorators/dbColumn";
import {CountryModel} from "@location/infrastructure/models/country.model";
import {StatusModel} from "@status/infrastructure/models/status.model";

@Table({tableName: "document_type", timestamps: true})
class DocumentTypeModel extends Model<InferAttributes<DocumentTypeModel>, InferCreationAttributes<DocumentTypeModel>> implements IDocumentTypeModel {
    @PrimaryKey
    @AutoIncrement
    @AllowNull(false)
    @DbColumn(DataType.INTEGER)
    declare id: CreationOptional<number>;

    @AllowNull(false)
    @Unique
    @DbColumn(DataType.STRING(50))
    declare description: string;

    @ForeignKey(() => CountryModel)
    @AllowNull(false)
    @DbColumn(DataType.INTEGER)
    declare countryId: number;

    @ForeignKey(() => StatusModel)
    @AllowNull(false)
    @DbColumn(DataType.INTEGER)
    declare statusId: number;

    @BelongsTo(() => CountryModel, {as: 'country'})
    country?: CountryModel;

    @BelongsTo(() => StatusModel, {as: 'status'})
    status?: StatusModel;

    @CreatedAt
    @DbColumn(DataType.DATE)
    declare createdAt?: Date;

    @UpdatedAt
    @DbColumn(DataType.DATE)
    declare updatedAt?: Date;
}

export {DocumentTypeModel};