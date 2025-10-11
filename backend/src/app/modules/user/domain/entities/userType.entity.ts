import {EntityBase} from "@coreShared/base/entity.base";
import {UserTypeTransform} from "@user/domain/transformers/userType.transformer";
import {UserTypeValidator} from "@user/domain/validators/userType.validator";
import {StatusTransformer} from "@status/domain/transformers/Status.transformer";

export interface UserTypeProps {
    id?: number;
    description: string;
    status: string;
}

export class UserTypeEntity extends EntityBase<UserTypeProps> {
    //#region PROPS
    public static readonly MIN_DESC: number = 5;
    public static readonly MAX_DESC: number = 50;
    //#endregion

    //#region CONSTRUCTOR
    constructor(props: UserTypeProps) {
        const normalizedProps: UserTypeProps = {
            ...props,
            description: UserTypeTransform.normalizeDescription(props.description),
            status: StatusTransformer.normalizeDescription(props.status)
        };
        super(normalizedProps);
        this.validateRequiredFields(['description', 'status']);
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

    get status(): string {
        return this.props.status;
    }

    //#endregion

    //#region VALIDATIONS
    private validate(): void {
        UserTypeValidator.validateDescriptionLength(this.props.description, UserTypeEntity.MIN_DESC, UserTypeEntity.MAX_DESC);
    }
    //#endregion

    //#region CREATE
    public static create(props: UserTypeProps): UserTypeEntity {
        return new UserTypeEntity(props);
    }

    //#endregion

    //#region UPDATES
    public update(props: Partial<UserTypeProps>): this {
        return this.cloneWith(props);
    }

    //#endregion
}