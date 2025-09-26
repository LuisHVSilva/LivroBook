import {EntityBase} from "@coreShared/base/entity.base";
import {BookValidator} from "@modules/book/domain/validators/book.validator";

export interface BookProps {
    id?: number;
    name: string;
    pageCount?: number;
    publishedDate?: Date;
    authorId?: number;
    publisherId?: number;
    bookCategoryId: number;
    languageId: number;
    statusId: number;
}

export class BookEntity extends EntityBase<BookProps> {
    //#region PROPERTIES
    public static readonly MIN_NAME: number = 4;
    public static readonly MAX_NAME: number = 255;
    //#endregion

    //#region CONSTRUCTOR
    constructor(props: BookProps) {
        super(props);
        this.validateRequiredFields(['name', 'bookCategoryId', 'languageId', 'statusId']);
        this.validate();
    }

    //#endregion

    //#region GET
    get id(): number | undefined {
        return this.props.id;
    }

    get name(): string {
        return this.props.name;
    }

    get pageCount(): number | undefined {
        return this.props.pageCount;
    }

    get publishedDate(): Date | undefined{
        return this.props.publishedDate;
    }

    get authorId(): number | undefined{
        return this.props.authorId;
    }

    get publisherId(): number | undefined{
        return this.props.publisherId;
    }

    get bookCategoryId(): number {
        return this.props.bookCategoryId;
    }

    get languageId(): number {
        return this.props.languageId;
    }

    get statusId(): number {
        return this.props.statusId;
    }

    //#endregion

    //#region VALIDATIONS
    private validate(): void {
        BookValidator.validateNameLength(this.props.name, BookEntity.MIN_NAME, BookEntity.MAX_NAME);
    }

    //#endregion

    //#region CREATE
    public static create(props: BookProps): BookEntity {
        return new BookEntity(props);
    }

    //#endregion

    //#region UPDATES
    public update(props: Partial<BookProps>): this {
        return this.cloneWith(props);
    }

    //#endregion
}