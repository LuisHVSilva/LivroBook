import {EntityBase} from "@coreShared/base/entity.base";
import {UserCredentialTypeTransform} from "@user/domain/transformers/userCredentialType.transformer";
import {UserCredentialTypeValidator} from "@user/domain/validators/userCredentialType.validator";
import {StatusTransformer} from "@status/domain/transformers/Status.transformer";


export interface UserCredentialTypeProps {
    id?: number;
    description: string;
    status: string;
}

export class UserCredentialTypeEntity extends EntityBase<UserCredentialTypeProps> {
    //#region PROPS
    public static readonly MIN_DESC: number = 5;
    public static readonly MAX_DESC: number = 50;
    //#endregion

    //#region CONSTRUCTOR
    constructor(props: UserCredentialTypeProps) {
        const normalizedProps: UserCredentialTypeProps = {
            ...props,
            description: UserCredentialTypeTransform.normalizeDescription(props.description),
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

    //#region VALIDATION
    private validate(): void {
        UserCredentialTypeValidator.validateDescriptionLength(
            this.props.description,
            UserCredentialTypeEntity.MIN_DESC,
            UserCredentialTypeEntity.MAX_DESC
        );
    }

    //#endregion

    //#region CREATE
    public static create(props: UserCredentialTypeProps): UserCredentialTypeEntity {
        return new UserCredentialTypeEntity(props);
    }

    //#endregion

    //#region UPDATE
    public update(props: Partial<UserCredentialTypeProps>): this {
        return this.cloneWith(props);
    }

    //#endregion
}