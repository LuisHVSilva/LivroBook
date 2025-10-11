import {EntityBase} from "@coreShared/base/entity.base";
import {UserCredentialValidator} from "@user/domain/validators/userCredential.validator";
import * as argon2 from "argon2";
import {UserCredentialTypeTransform} from "@user/domain/transformers/userCredentialType.transformer";
import {StatusTransformer} from "@status/domain/transformers/Status.transformer";

export interface UserCredentialProps {
    id?: number;
    userEmail: string;
    password?: string;
    loginAttempts: number;
    lastLoginIp?: string;
    lastLoginAt?: Date;
    userCredentialType: string;
    status: string;
}

export class UserCredentialEntity extends EntityBase<UserCredentialProps> {
    //#region PROPS
    public static MIN_PASSWORD: number = 6;
    public static MAX_LOGIN_ATTEMPTS: number = 3;
    //#endregion

    //#region constructor
    constructor(props: UserCredentialProps) {
        const normalizedProps: UserCredentialProps = {
            ...props,
            userCredentialType: UserCredentialTypeTransform.normalizeDescription(props.userCredentialType),
            status: StatusTransformer.normalizeDescription(props.status)
        };

        super(normalizedProps);

        this.validateRequiredFields([
            'loginAttempts',
            'userEmail',

            'status',
            'userCredentialType'
        ]);

        this.validate();
    }

    //#endregion

    //#region GET
    get id(): number | undefined {
        return this.props.id;
    }

    get userEmail(): string {
        return this.props.userEmail;
    }

    get password(): string | undefined {
        return this.props.password;
    }

    get loginAttempts(): number {
        return this.props.loginAttempts;
    }

    get lastLoginIp(): string | undefined {
        return this.props.lastLoginIp;
    }

    get lastLoginAt(): Date | undefined {
        return this.props.lastLoginAt;
    }

    get userCredentialType(): string {
        return this.props.userCredentialType;
    }

    get status(): string {
        return this.props.status;
    }
    //#endregion

    //#region VALIDATION
    private validate(): void {
        UserCredentialValidator.validateLoginAttemptsType(this.props.loginAttempts);
        UserCredentialValidator.validateLastLoginIp(this.props.lastLoginIp);
    }

    //#endregion

    //#region CREATE
    private static createDefaultProperties(): Pick<
        UserCredentialProps,
        "loginAttempts" | "lastLoginIp" | "lastLoginAt"
    > {
        return {
            loginAttempts: 0,
            lastLoginIp: undefined,
            lastLoginAt: undefined,
        };
    }

    public static async create(props: Omit<UserCredentialProps, "loginAttempts" | "lastLoginIp" | "lastLoginAt">): Promise<UserCredentialEntity> {
        const defaultProps: Pick<UserCredentialProps, "loginAttempts" | "lastLoginIp" | "lastLoginAt"> =
            Object.assign(props, this.createDefaultProperties());

        if (props.password) {
            return this.createWithPassword(props.password, {...props, ...defaultProps});
        }

        return new UserCredentialEntity({...props, ...defaultProps});
    }


    public static async createWithPassword(plainPassword: string, props: Omit<UserCredentialProps, 'password'>): Promise<UserCredentialEntity> {
        UserCredentialValidator.validatePassword(plainPassword, this.MIN_PASSWORD);
        const password: string = await this.hashPassword(plainPassword);
        return new UserCredentialEntity({...props, password});
    }

    //#endregion

    //#region UPDATE
    public update(props: Partial<UserCredentialProps>): this {
        //Password updated rules is on service
        return this.cloneWith(props);
    }

    public async changePassword(newPassword: string): Promise<string> {
        UserCredentialValidator.validatePassword(newPassword, UserCredentialEntity.MIN_PASSWORD);
        return await UserCredentialEntity.hashPassword(newPassword);
    }

    //#endregion

    //#region HELPERS

    public static async hashPassword(password: string): Promise<string> {
        return await argon2.hash(password);
    }

    public static async verifyPassword(hashedPassword: string, plainPassword: string): Promise<boolean> {
        return await argon2.verify(hashedPassword, plainPassword);
    }

    public static rehydrate(props: UserCredentialProps): UserCredentialEntity {
        return new UserCredentialEntity(props);
    }

    //#endregion
}
