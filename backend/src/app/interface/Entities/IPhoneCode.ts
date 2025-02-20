export interface PhoneCodeEntity {
    id: bigint;
    country: bigint;
    regionDescription: string;
    phoneDDD: number;
    status: number;
    createdAt: Date;
    updatedAt: Date;
}
