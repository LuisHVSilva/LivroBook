import {UserCredentialTypeModel} from "@user/infrastructure/models/userCredentialType.model";
import {StatusModel} from "@status/infrastructure/models/status.model";

export interface IUserCredentialModel {
    id?: number;
    password?: string;
    loginAttempts: number;
    isTwoFactorEnabled: boolean;
    isEmailVerified: boolean;
    lastLoginIp?: string;
    lastLoginAt?: Date;
    userCredentialTypeId: number;
    statusId: number;
    userCredentialType?: UserCredentialTypeModel;
    status?: StatusModel;
    createdAt?: Date;
    updatedAt?: Date;
}