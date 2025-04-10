import {StatusModel} from "@status/infrastructure/models/StatusModel";

export interface IUserTypeModel {
    id?: number;
    description: string;
    statusId?: number;
    status?: StatusModel;
    createdAt?: Date;
    updatedAt?: Date;
}