import {EntityBase} from "@coreShared/base/entity.base";
import {UserValidator} from "@user/domain/validators/user.validator";

export interface UserProps {
    id?: number;
    name: string;
    email: string;
    document?: string;
    birthday: Date;
    userTypeId: number;
    cityId?: number;
    userCredentialId: number;
    documentTypeId?: number;
    phoneId?: number;
    statusId: number;
}

export class UserEntity extends EntityBase<UserProps> {

    //#region PROPS
    public static readonly MIN_NAME: number = 4;
    public static readonly MAX_NAME: number = 100;
    public static readonly MIN_EMAIL: number = 6;
    public static readonly MAX_EMAIL: number = 100;
    public static readonly MIN_DOC: number = 6;
    public static readonly MAX_DOC: number = 100;
    //#endregion

    //#region CONSTRUCTOR
    constructor(props: UserProps) {
        super(props);

        // this.validateRequiredFields([
        //     'name',
        //     'email',
        //     // 'document',
        //     'birthday',
        //     'userTypeId',
        //     // 'cityId',
        //     'userCredentialId',
        //     // 'documentTypeId',
        //     'statusId',
        // ]);

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

    get email(): string {
        return this.props.email;
    }

    get document(): string | undefined {
        return this.props.document;
    }

    get birthday(): Date {
        return this.props.birthday;
    }

    get userTypeId(): number {
        return this.props.userTypeId;
    }

    get cityId(): number | undefined {
        return this.props.cityId;
    }

    get userCredentialId(): number {
        return this.props.userCredentialId;
    }

    get documentTypeId(): number | undefined{
        return this.props.documentTypeId;
    }

    get phoneId(): number | undefined {
        return this.props.phoneId;
    }

    get statusId(): number {
        return this.props.statusId;
    }
    //#endregion

    //#region VALIDATION
    private validate(): void {
        UserValidator.validateName(this.props.name, UserEntity.MIN_NAME, UserEntity.MAX_NAME);
        UserValidator.validateEmail(this.props.email);
        UserValidator.validateDocumentsFields(this.props.document, this.props.documentTypeId);
        //this.validateIsUnder18();
    }
    //#endregion

    //#region CREATE
    public static create(props: UserProps): UserEntity {
        return new UserEntity(props);
    }
    //#endregion

    //#region UPDATE
    public update(props: Partial<UserProps>): this {
        return this.cloneWith(props);
    }
    //#endregion
}