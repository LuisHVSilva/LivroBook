import {UserCredentialTypeModel} from "@user/infrastructure/models/userCredentialType.model";
import {StatusModel} from "@status/infrastructure/models/status.model";
import {UserModel} from "@user/infrastructure/models/user.model";

export interface IUserCredentialModel {
    id?: number;
    userId: number;
    password?: string;
    loginAttempts: number;
    lastLoginIp?: string;
    lastLoginAt?: Date;
    userCredentialTypeId: number;
    statusId: number;
    user?: UserModel;
    userCredentialType?: UserCredentialTypeModel;
    status?: StatusModel;
    createdAt?: Date;
    updatedAt?: Date;
}