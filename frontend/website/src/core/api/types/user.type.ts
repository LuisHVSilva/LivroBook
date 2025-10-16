export type UserEntity = {
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