export interface UserSessionEntity {
    id: bigint;
    userId: bigint;
    ipAddress: string;
    refreshToken: string;     
    status: number;    
    lastUsedAt: Date;
    expiresAt: Date;
    createdAt: Date;
    updatedAt: Date;
}