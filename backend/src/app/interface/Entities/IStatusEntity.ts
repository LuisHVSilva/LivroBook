export interface IStatusEntity {
    id: bigint;
    description: string;    
    active?: boolean;
    createdAt?: Date;
    updatedAt?: Date;
}
