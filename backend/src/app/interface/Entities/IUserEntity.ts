export interface UserEntity {
    id: bigint;
    userTypeId: number;
    name: string;
    phoneDDD: bigint
    phoneCountryCode: bigint;
    phoneNumber: number;
    birthDate: Date;
    nationality: bigint;
    email: string;
    username: string;
    password: string;
    loginCount: bigint;
    status: number;
    createdAt: Date;
    updatedAt: Date;
}
