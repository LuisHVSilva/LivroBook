import {CountryModel} from "@location/infrastructure/models/country.model";
import {StatusModel} from "@status/infrastructure/models/status.model";

export interface IStateModel {
    id?: number;
    description: string;
    countryId: number;
    statusId: number;
    country?: CountryModel;
    status?: StatusModel;
    createdAt?: Date;
    updatedAt?: Date;
}