import {StatusModel} from "@status/infrastructure/models/status.model";

export interface IAuthorModel {
    id: number;
    name: string;
    statusId: number;
    status?: StatusModel;
    createdAt?: Date;
    updatedAt?: Date;
}