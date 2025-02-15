export interface PhoneCodeEntity {
    id: bigint;
    country: bigint;
    regionDescription: string;
    phoneDDD: number;
    status: bigint;
    createdAt: Date;
    updatedAt: Date;
}
