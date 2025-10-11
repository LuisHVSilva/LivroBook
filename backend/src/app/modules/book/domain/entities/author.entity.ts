import {EntityBase} from "@coreShared/base/entity.base";
import {AuthorValidator} from "@modules/book/domain/validators/author.validator";

export interface AuthorProps {
    id?: number;
    name: string;
    status: string;
}

export class AuthorEntity extends EntityBase<AuthorProps> {
    //#region PROPERTIES
    public static readonly MIN_NAME: number = 4;
    public static readonly MAX_NAME: number = 255;
    //#endregion

    //#region CONSTRUCTOR
    constructor(props: AuthorProps) {
        super(props);
        this.validateRequiredFields(['name', 'status']);
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

    get status(): string {
        return this.props.status;
    }

    //#endregion

    //#region VALIDATIONS
    private validate(): void {
        AuthorValidator.validateNameLength(this.props.name, AuthorEntity.MIN_NAME, AuthorEntity.MAX_NAME);
    }

    //#endregion

    //#region CREATE
    public static create(props: AuthorProps): AuthorEntity {
        return new AuthorEntity(props);
    }

    //#endregion

    //#region UPDATES
    public update(props: Partial<AuthorProps>): this {
        return this.cloneWith(props);
    }

    //#endregion
}