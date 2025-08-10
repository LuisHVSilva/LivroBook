import {PhoneCodeModel} from "@phone/infrastructure/models/phoneCode.model";
import {PhoneTypeModel} from "@phone/infrastructure/models/phoneType.model";
import {StatusModel} from "@status/infrastructure/models/status.model";

export interface IPhoneModel {
    id: number;
    number: string;
    phoneCodeId: number;
    phoneTypeId: number;
    statusId: number;
    phoneCode?: PhoneCodeModel;
    phoneType?: PhoneTypeModel;
    status?: StatusModel;
    createdAt?: Date;
    updatedAt?: Date;
}