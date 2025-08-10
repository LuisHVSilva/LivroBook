import {StateModel} from "@location/infrastructure/models/state.model";
import {StatusModel} from "@status/infrastructure/models/status.model";

export interface ICityModel {
    id?: number;
    description: string;
    stateId: number;
    statusId: number;
    state?: StateModel;
    status?: StatusModel;
    createdAt?: Date;
    updatedAt?: Date;
}