import {StateModel} from "@location/infrastructure/models/state.model";
import {StatusModel} from "@status/infrastructure/models/status.model";

export interface IPhoneCodeModel {
    id: number;
    ddiCode: string;
    dddCode: string;
    stateId: number;
    statusId: number;
    state?: StateModel;
    status?: StatusModel;
    createdAt?: Date;
    updatedAt?: Date;
}