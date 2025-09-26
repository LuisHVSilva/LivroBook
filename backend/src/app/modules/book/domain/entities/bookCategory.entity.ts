import {EntityBase} from "@coreShared/base/entity.base";
import {BookCategoryTransform} from "@modules/book/domain/transformers/bookCategory.transform";
import {BookCategoryValidator} from "@modules/book/domain/validators/bookCategory.validator";

export interface BookCategoryProps {
    id?: number;
    description: string;
    statusId: number;
}

export class BookCategoryEntity extends EntityBase<BookCategoryProps> {
    //#region PROPERTIES
    public static readonly MIN_DESC: number = 4;
    public static readonly MAX_DESC: number = 100;
    //#endregion

    //#region CONSTRUCTOR
    constructor(props: BookCategoryProps) {
        const normalizedProps: BookCategoryProps = {
            ...props,
            description: BookCategoryTransform.normalizeDescription(props.description),
        };
        super(normalizedProps);
        this.validateRequiredFields(['description', 'statusId']);
        this.validate();
    }

    //#endregion

    //#region GET
    get id(): number | undefined {
        return this.props.id;
    }

    get description(): string {
        return this.props.description;
    }

    get statusId(): number {
        return this.props.statusId;
    }

    //#endregion

    //#region VALIDATIONS
    private validate(): void {
        BookCategoryValidator.validateDescriptionLength(this.props.description, BookCategoryEntity.MIN_DESC, BookCategoryEntity.MAX_DESC);
    }

    //#endregion

    //#region CREATE
    public static create(props: BookCategoryProps): BookCategoryEntity {
        return new BookCategoryEntity(props);
    }

    //#endregion

    //#region UPDATES
    public update(props: Partial<BookCategoryProps>): this {
        return this.cloneWith(props);
    }

    //#endregion
}