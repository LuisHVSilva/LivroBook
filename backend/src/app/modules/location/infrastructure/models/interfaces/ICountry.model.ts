import {StatusModel} from "@status/infrastructure/models/status.model";

export interface ICountryModel {
    id?: number;
    description: string;
    statusId: number;
    status?: StatusModel;
    createdAt?: Date;
    updatedAt?: Date;
}