import {
    DataType,
    Model,
    PrimaryKey,
    AutoIncrement,
    AllowNull,
    Table,
    CreatedAt,
    UpdatedAt,
    ForeignKey,
    BelongsTo
} from "sequelize-typescript";

import {CreationOptional, InferAttributes, InferCreationAttributes} from "sequelize";
import {DbColumn} from "@coreShared/decorators/dbColumn";
import {StatusModel} from "@status/infrastructure/models/status.model";
import {IBookModel} from "@modules/book/infrastructure/models/interfaces/IBook.model";
import {AuthorModel} from "@modules/book/infrastructure/models/author.model";
import {PublisherModel} from "@modules/book/infrastructure/models/publisher.model";
import {BookCategoryModel} from "@modules/book/infrastructure/models/bookCategory.model";
import {LanguageModel} from "@modules/book/infrastructure/models/language.model";

@Table({tableName: "book", timestamps: true})
class BookModel extends Model<InferAttributes<BookModel>, InferCreationAttributes<BookModel>> implements IBookModel {
    @PrimaryKey
    @AutoIncrement
    @AllowNull(false)
    @DbColumn(DataType.INTEGER)
    declare id: CreationOptional<number>;

    @AllowNull(false)
    @DbColumn(DataType.STRING())
    declare name: string;

    @AllowNull(true)
    @DbColumn(DataType.INTEGER)
    declare pageCount?: number;

    @AllowNull(true)
    @DbColumn(DataType.DATE)
    declare publishedDate?: Date;

    @ForeignKey(() => AuthorModel)
    @AllowNull(true)
    @DbColumn(DataType.INTEGER)
    declare authorId: number;

    @ForeignKey(() => PublisherModel)
    @AllowNull(true)
    @DbColumn(DataType.INTEGER)
    declare publisherId: number;

    @ForeignKey(() => BookCategoryModel)
    @AllowNull(true)
    @DbColumn(DataType.INTEGER)
    declare bookCategoryId: number;

    @ForeignKey(() => LanguageModel)
    @AllowNull(true)
    @DbColumn(DataType.INTEGER)
    declare languageId: number;

    @ForeignKey(() => StatusModel)
    @AllowNull(false)
    @DbColumn(DataType.INTEGER)
    declare statusId: number;

    @BelongsTo(() => StatusModel, {as: "status"})
    status?: StatusModel;

    @BelongsTo(() => AuthorModel, {as: "author"})
    author?: AuthorModel;

    @BelongsTo(() => PublisherModel, {as: "publisher"})
    publisher?: PublisherModel;

    @BelongsTo(() => BookCategoryModel, {as: "bookCategory"})
    bookCategory?: BookCategoryModel;

    @BelongsTo(() => LanguageModel, {as: "language"})
    language?: LanguageModel;

    @CreatedAt
    @DbColumn(DataType.DATE)
    declare createdAt?: Date;

    @UpdatedAt
    @DbColumn(DataType.DATE)
    declare updatedAt?: Date;
}

export {BookModel};