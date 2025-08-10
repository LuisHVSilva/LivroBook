import {BaseEntity} from "@coreShared/base/baseEntity";

export interface UserProps {
    id?: number;
    name: string;
    email: string;
    document: string;
    birthday: Date;
    userTypeId: number;
    cityId: number;
    userCredentialId: number;
    documentTypeId: number;
    phoneId?: number;
    statusId: number
}

export class UserEntity extends BaseEntity<UserProps> {
    private readonly _id: number | undefined;
    private readonly _name: string;
    private readonly _email: string;
    private readonly _document: string;
    private readonly _birthday: Date;
    private readonly _userTypeId: number;
    private readonly _cityId: number;
    private readonly _userCredentialId: number;
    private readonly _documentTypeId: number;
    private readonly _phoneId: number | undefined;
    private readonly _statusId: number;

    private constructor(props: UserProps) {
        super(props);

        this.validateRequiredFields([
            'name',
            'email',
            'document',
            'birthday',
            'userTypeId',
            'cityId',
            'userCredentialId',
            'documentTypeId',
            'statusId',
        ]);

        this._id = props.id;
        this._name = props.name.toUpperCase();
        this._email = props.email;
        this._document = props.document;
        this._birthday = props.birthday;
        this._userTypeId = props.userTypeId;
        this._cityId = props.cityId;
        this._userCredentialId = props.userCredentialId;
        this._documentTypeId = props.documentTypeId;
        this._phoneId = props.phoneId;
        this._statusId = props.statusId;

        this.validate();
    }

    get id(): number | undefined {
        return this._id;
    }

    get name(): string {
        return this._name;
    }

    get email(): string {
        return this._email;
    }

    get document(): string {
        return this._document;
    }

    get birthday(): Date {
        return this._birthday;
    }

    get userTypeId(): number {
        return this._userTypeId;
    }

    get cityId(): number {
        return this._cityId;
    }

    get userCredentialId(): number {
        return this._userCredentialId;
    }

    get documentTypeId(): number {
        return this._documentTypeId;
    }

    get phoneId(): number | undefined {
        return this._phoneId;
    }

    get statusId(): number {
        return this._statusId;
    }

    private validate(): void {
        this.validateName();
        this.validateEmail();
        this.validateIsUnder18();
    }

    private validateName(): void {
        if (!this._name || this._name.length <= 3 || this._name.length > 100) {
            throw new Error("Description must be between 3 and 100 characters long.");
        }
    }

    private validateEmail(): void {
        const emailRegex = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;
        if (!this._email || !emailRegex.test(this._email)) {
            throw new Error("Invalid email format.");
        }
    }

    private validateIsUnder18(): void {
        const today = new Date();
        let age: number = today.getFullYear() - this._birthday.getFullYear();
        const month: number = today.getMonth() - this._birthday.getMonth();

        if(month < 0 || (month === 0 && today.getDate() < this._birthday.getDate())) {
            age--;
        }

        if(age < 18) {
            throw new Error("User must be at least 18 years old.");
        }
    }

    public static create(props: UserProps): UserEntity {
        return new UserEntity(props);
    }

    public updateName(name: string): this {
        const updatedProps: Partial<UserProps> = { name };
        return this.cloneWith(updatedProps);
    }

    public updateEmail(email: string): this {
        const updatedProps: Partial<UserProps> = { email };
        return this.cloneWith(updatedProps);
    }

    public updateDocument(document: string): this {
        const updatedProps: Partial<UserProps> = { document };
        return this.cloneWith(updatedProps);
    }

    public updateBirthday(birthday: Date): this {
        const updatedProps: Partial<UserProps> = { birthday };
        return this.cloneWith(updatedProps);
    }

    public updateUserTypeId(userTypeId: number): this {
        const updatedProps: Partial<UserProps> = { userTypeId };
        return this.cloneWith(updatedProps);
    }

    public updateCityId(cityId: number): this {
        const updatedProps: Partial<UserProps> = { cityId };
        return this.cloneWith(updatedProps);
    }

    public updateUserCredentialId(userCredentialId: number): this {
        const updatedProps: Partial<UserProps> = { userCredentialId };
        return this.cloneWith(updatedProps);
    }

    public updateDocumentTypeId(documentTypeId: number): this {
        const updatedProps: Partial<UserProps> = { documentTypeId };
        return this.cloneWith(updatedProps);
    }

    public updatePhoneId(phoneId: number | undefined): this {
        const updatedProps: Partial<UserProps> = { phoneId };
        return this.cloneWith(updatedProps);
    }

    public updateStatusId(statusId: number): this {
        const updatedProps: Partial<UserProps> = { statusId };
        return this.cloneWith(updatedProps);
    }

    public toJSON(): Record<string, unknown> {
        return {
            id: this._id,
            userTypeId: this._userTypeId,
            name: this._name,
            email: this._email,
            birthday: this._birthday,
            document: this._document,
            documentTypeId: this._documentTypeId,
            cityId: this._cityId,
            phoneId: this._phoneId,
            statusId: this._statusId
        };
    }

}