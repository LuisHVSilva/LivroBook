export interface UserEntity {
    id: bigint;
    userTypeId: bigint;
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
    status: bigint;
    createdAt: Date;
    updatedAt: Date;
}
