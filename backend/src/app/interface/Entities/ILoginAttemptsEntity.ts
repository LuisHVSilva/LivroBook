export interface LoginAttemptsEntity {
    id: bigint;
    userId: bigint;
    ipAddress: string;
    userAgent: string;
    reason: string;
    status: number;
    createdAt: Date;
    updatedAt: Date;    
}
