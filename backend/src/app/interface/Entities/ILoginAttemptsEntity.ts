export interface LoginAttemptsEntity {
    id: bigint;
    userId: bigint;
    ipAddress: string;
    userAgent: string;
    reason: string;
    status: bigint;
    createdAt: Date;
    updatedAt: Date;    
}
