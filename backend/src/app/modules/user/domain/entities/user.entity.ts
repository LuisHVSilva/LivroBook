import {EntityBase} from "@coreShared/base/entity.base";
import {UserValidator} from "@user/domain/validators/user.validator";
import {CityTransformer} from "@location/domain/transformers/city.transform";
import {StatusTransformer} from "@status/domain/transformers/Status.transformer";
import {DocumentTypeTransform} from "@document/domain/transformers/documentType.transform";
import {UserTypeTransform} from "@user/domain/transformers/userType.transformer";

export interface UserProps {
    id?: number;
    name: string;
    email: string;
    document?: string;
    birthday: Date;
    isTwoFactorEnable: boolean;
    isEmailVerified: boolean;
    city?: string;
    documentType?: string;
    phone?: string;
    userType: string;
    status: string;
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
        const normalizedProps: UserProps = {
            ...props,
            city: props.city ? CityTransformer.normalizeDescription(props.city) : undefined,
            documentType: props.documentType ? DocumentTypeTransform.normalizeDescription(props.documentType) : undefined,
            userType: UserTypeTransform.normalizeDescription(props.userType),
            status: StatusTransformer.normalizeDescription(props.status)
        };

        super(normalizedProps);

        this.validateRequiredFields([
            'name',
            'email',
            // 'document',
            'birthday',
            'isTwoFactorEnable',
            'isEmailVerified',
            'userType',
            // 'city',
            // 'documentType',
            'status',
        ]);

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

    get isTwoFactorEnable(): boolean {
        return this.props.isTwoFactorEnable;
    }

    get isEmailVerified(): boolean {
        return this.props.isEmailVerified;
    }

    get userType(): string {
        return this.props.userType;
    }

    get city(): string | undefined {
        return this.props.city;
    }

    get documentType(): string | undefined {
        return this.props.documentType;
    }

    get phone(): string | undefined {
        return this.props.phone;
    }

    get status(): string {
        return this.props.status;
    }

    //#endregion

    //#region VALIDATION
    private validate(): void {
        UserValidator.validateName(this.props.name, UserEntity.MIN_NAME, UserEntity.MAX_NAME);
        UserValidator.validateEmail(this.props.email);
        UserValidator.validateDocumentsFields(this.props.document, this.props.documentType);
        //this.validateIsUnder18();
    }

    //#endregion

    //#region CREATE
    public static create(props: Omit<UserProps, "isTwoFactorEnable" | "isEmailVerified">): UserEntity {
        return new UserEntity({
            ...props,
            isTwoFactorEnable: false,
            isEmailVerified: false,
        });
    }

    //#endregion

    //#region UPDATE
    public update(props: Partial<UserProps>): this {
        return this.cloneWith(props);
    }

    //#endregion

    public static rehydrate(props: UserProps): UserEntity {
        return new UserEntity(props);
    }
}