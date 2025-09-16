import {EntityBase} from "@coreShared/base/entity.base";
import {UserCredentialValidator} from "@user/domain/validators/userCredential.validator";
import * as argon2 from "argon2";
import {CreateUserCredentialEntityDTO} from "@user/adapters/dtos/userCredential.dto";

export interface UserCredentialProps {
    id?: number;
    password?: string;
    loginAttempts: number;
    isTwoFactorEnable: boolean;
    isEmailVerified: boolean;
    lastLoginIp?: string;
    lastLoginAt?: Date;
    userCredentialTypeId: number;
    statusId: number;
}

export class UserCredentialEntity extends EntityBase<UserCredentialProps> {
    //#region PROPS
    public static MIN_PASSWORD: number = 6;
    //#endregion

    //#region constructor
    constructor(props: UserCredentialProps) {
        super(props);

        this.validateRequiredFields(['loginAttempts', 'isTwoFactorEnable', 'isEmailVerified', 'statusId', 'userCredentialTypeId']);

        this.validate();
    }

    //#endregion

    //#region GET
    get id(): number | undefined {
        return this.props.id;
    }

    get password(): string | undefined {
        return this.props.password;
    }

    get loginAttempts(): number {
        return this.props.loginAttempts;
    }

    get isTwoFactorEnable(): boolean {
        return this.props.isTwoFactorEnable;
    }

    get isEmailVerified(): boolean {
        return this.props.isEmailVerified;
    }

    get lastLoginIp(): string | undefined {
        return this.props.lastLoginIp;
    }

    get lastLoginAt(): Date | undefined {
        return this.props.lastLoginAt;
    }

    get userCredentialTypeId(): number {
        return this.props.userCredentialTypeId;
    }

    get statusId(): number {
        return this.props.statusId;
    }

    //#endregion

    //#region VALIDATION
    private validate(): void {
        UserCredentialValidator.validateLoginAttempts(this.props.loginAttempts);
        UserCredentialValidator.validateLastLoginIp(this.props.lastLoginIp);
    }

    //#endregion

    //#region CREATE
    private static createDefaultProperties(): Pick<
        UserCredentialProps,
        "loginAttempts" | "isTwoFactorEnable" | "isEmailVerified" | "lastLoginIp" | "lastLoginAt"
    > {
        return {
            loginAttempts: 0,
            isTwoFactorEnable: false,
            isEmailVerified: false,
            lastLoginIp: undefined,
            lastLoginAt: undefined,
        };
    }

    public static async create(props: CreateUserCredentialEntityDTO): Promise<UserCredentialEntity> {
        const defaultProps: Pick<
            UserCredentialProps,
            "loginAttempts" | "isTwoFactorEnable" | "isEmailVerified" | "lastLoginIp" | "lastLoginAt"
        > = Object.assign(props, this.createDefaultProperties());

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

    async verifyPassword(oldPassword: string): Promise<boolean> {
        const hashedOld: string = await UserCredentialEntity.hashPassword(oldPassword);
        return this.password === hashedOld;
    }

    //#endregion
}
