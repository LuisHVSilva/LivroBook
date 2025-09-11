import {EntityBase} from "@coreShared/base/entity.base";
import {PasswordHasherSecurity} from "@coreShared/security/passwordHasher.security";
import {isIP} from 'net';
import {PasswordValidatorUtil} from "@coreShared/utils/passwordValidator.util";


export interface UserCredentialProps {
    id?: number;
    password?: string;
    loginAttempts: number;
    isTwoFactorEnabled: boolean;
    isEmailVerified: boolean;
    lastLoginIP?: string;
    lastLoginAt?: Date;
    userCredentialTypeId: number;
    statusId: number;
}

export class UserCredentialEntity extends EntityBase<UserCredentialProps> {
    private readonly _id: number | undefined;
    private readonly _password: string | undefined;
    private readonly _loginAttempts: number;
    private readonly _isTwoFactorEnabled: boolean;
    private readonly _isEmailVerified: boolean;
    private readonly _lastLoginIP: string | undefined;
    private readonly _lastLoginAt: Date | undefined;
    private readonly _userCredentialType: number;
    private readonly _status: number;

    private constructor(props: UserCredentialProps) {
        super(props);

        this.validateRequiredFields(['loginAttempts', 'isTwoFactorEnabled', 'isEmailVerified', 'lastLoginIP',
            'lastLoginAt', 'statusId', 'userCredentialTypeId']);

        this._id = props.id;
        this._password = props.password;
        this._loginAttempts = props.loginAttempts;
        this._isTwoFactorEnabled = props.isTwoFactorEnabled;
        this._isEmailVerified = props.isEmailVerified;
        this._lastLoginIP = props.lastLoginIP;
        this._lastLoginAt = props.lastLoginAt;
        this._userCredentialType = props.userCredentialTypeId;
        this._status = props.statusId;

        this.validate();
    }

    get id(): number | undefined {
        return this._id;
    }

    get password(): string | undefined {
        return this._password;
    }

    get loginAttempts(): number {
        return this._loginAttempts;
    }

    get isTwoFactorEnabled(): boolean {
        return this._isTwoFactorEnabled;
    }

    get isEmailVerified(): boolean {
        return this._isEmailVerified;
    }

    get lastLoginIP(): string | undefined {
        return this._lastLoginIP;
    }

    get lastLoginAt(): Date | undefined {
        return this._lastLoginAt;
    }

    get userCredentialTypeId(): number {
        return this._userCredentialType;
    }

    get statusId(): number {
        return this._status;
    }

    private validate(): void {
        this.validateLoginAttempts();
        this.validateLastLoginIP();
    }

    private validateLoginAttempts(): void {
        if (this._loginAttempts < 0) {
            throw new Error("Login attempts cannot be negative");
        }
    }

    private validateLastLoginIP(): void {
        if (this._lastLoginIP != undefined && isIP(this._lastLoginIP) !== 4) {
            throw new Error("Invalid IP address");
        }
    }

    public static async createWithPassword(plainPassword: string, props: Omit<UserCredentialProps, 'password'>): Promise<UserCredentialEntity> {
        PasswordValidatorUtil.validate(plainPassword);
        const password: string = await PasswordHasherSecurity.hash(plainPassword);
        return new UserCredentialEntity({...props, password});
    }

    public updatePassword(newPassword: string): this {
        PasswordValidatorUtil.validate(newPassword);
        return this.cloneWith({password: newPassword});
    }

    public updateLoginAttempts(newLoginAttempts: number): this {
        return this.cloneWith({loginAttempts: newLoginAttempts});
    }

    public activateTwoFactorStatus(): this {
        return this.cloneWith({isTwoFactorEnabled: true});
    }

    public deactivateTwoFactorStatus(): this {
        return this.cloneWith({isTwoFactorEnabled: false});
    }

    public verifyEmail(): this {
        return this.cloneWith({isEmailVerified: true});
    }

    public updateLastLoginIP(ip: string): this {
        return this.cloneWith({lastLoginIP: ip, lastLoginAt: new Date()});
    }

    public updateUserCredentialTypeId(userCredentialTypeId: number): this {
        return this.cloneWith({userCredentialTypeId});
    }

    public updateStatusId(statusId: number): this {
        return this.cloneWith({statusId});
    }

    public update(props: Partial<UserCredentialProps>): this {
        return this.cloneWith(props);
    }
}
