import {EntityBase} from "@coreShared/base/entity.base";
import {PublisherValidator} from "@modules/book/domain/validators/publisher.validator";

export interface PublisherProps {
    id?: number;
    name: string;
    status: string;
}

export class PublisherEntity extends EntityBase<PublisherProps> {
    //#region PROPERTIES
    public static readonly MIN_NAME: number = 4;
    public static readonly MAX_NAME: number = 50;
    //#endregion

    //#region CONSTRUCTOR
    constructor(props: PublisherProps) {
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
        PublisherValidator.validateNameLength(this.props.name, PublisherEntity.MIN_NAME, PublisherEntity.MAX_NAME);
    }

    //#endregion

    //#region CREATE
    public static create(props: PublisherProps): PublisherEntity {
        return new PublisherEntity(props);
    }

    //#endregion

    //#region UPDATES
    public update(props: Partial<PublisherProps>): this {
        return this.cloneWith(props);
    }

    //#endregion
}