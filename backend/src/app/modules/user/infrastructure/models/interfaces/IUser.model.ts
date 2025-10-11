import {UserTypeModel} from "@user/infrastructure/models/userType.model";
import {CityModel} from "@location/infrastructure/models/city.model";
import {DocumentTypeModel} from "@document/infrastructure/models/documentType.model";
import {PhoneModel} from "@phone/infrastructure/models/phone.model";
import {StatusModel} from "@status/infrastructure/models/status.model";

export interface IUserModel {
    id?: number;
    name: string;
    email: string;
    document?: string;
    birthday: Date;
    isTwoFactorEnable: boolean;
    isEmailVerified: boolean;
    userTypeId: number;
    cityId?: number;
    documentTypeId?: number;
    phoneId?: number;
    statusId: number;
    userType?: UserTypeModel;
    city?: CityModel;
    documentType?: DocumentTypeModel;
    phone?: PhoneModel;
    status?: StatusModel
    createdAt?: Date;
    updatedAt?: Date;
}
