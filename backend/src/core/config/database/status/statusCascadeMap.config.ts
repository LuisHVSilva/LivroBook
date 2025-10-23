import {Model, ModelStatic} from "sequelize";
import {PhoneModel} from "@phone/infrastructure/models/phone.model";
import {PhoneTypeModel} from "@phone/infrastructure/models/phoneType.model";
import {CountryModel} from "@location/infrastructure/models/country.model";
import {StateModel} from "@location/infrastructure/models/state.model";
import {DocumentTypeModel} from "@document/infrastructure/models/documentType.model";
import {UserModel} from "@user/infrastructure/models/user.model";
import {CityModel} from "@location/infrastructure/models/city.model";
import {PhoneCodeModel} from "@phone/infrastructure/models/phoneCode.model";
import {UserTypeModel} from "@user/infrastructure/models/userType.model";
import {UserCredentialTypeModel} from "@user/infrastructure/models/userCredentialType.model";
import {UserCredentialModel} from "@user/infrastructure/models/userCredential.model";


export const STATUS_CASCADE_MAP: Map<
    ModelStatic<Model<any, any>>,
    { model: ModelStatic<Model<any, any>>; foreignKey: string }[]
> = new Map([
    [
        DocumentTypeModel as unknown as ModelStatic<Model<any, any>>,
        [
            {model: UserModel, foreignKey: "userTypeId"},
        ],
    ],
    [
        CityModel as unknown as ModelStatic<Model<any, any>>,
        [
            {model: UserModel, foreignKey: "cityId"},
        ],
    ],
    [
        StateModel as unknown as ModelStatic<Model<any, any>>,
        [
            {model: CityModel, foreignKey: "stateId"},
            {model: PhoneCodeModel, foreignKey: "stateId"},
        ],
    ],
    [
        CountryModel as unknown as ModelStatic<Model<any, any>>,
        [
            {model: StateModel, foreignKey: "countryId"},
            {model: DocumentTypeModel, foreignKey: "countryId"},
        ]
    ],
    [
        PhoneTypeModel as unknown as ModelStatic<Model<any, any>>,
        [
            {model: PhoneModel as unknown as ModelStatic<Model<any, any>>, foreignKey: "phoneTypeId"},
        ],
    ],
    [
        PhoneCodeModel as unknown as ModelStatic<Model<any, any>>,
        [
            {model: PhoneModel as unknown as ModelStatic<Model<any, any>>, foreignKey: "phoneCodeId"},
        ],
    ],
    [
        PhoneModel as unknown as ModelStatic<Model<any, any>>,
        [
            {model: UserModel as unknown as ModelStatic<Model<any, any>>, foreignKey: "phoneId"},
        ],
    ],
    [
        UserTypeModel as unknown as ModelStatic<Model<any, any>>,
        [
            {model: UserModel as unknown as ModelStatic<Model<any, any>>, foreignKey: "userTypeId"},
        ],
    ],
    [
        UserCredentialTypeModel as unknown as ModelStatic<Model<any, any>>,
        [
            {model: UserCredentialModel as unknown as ModelStatic<Model<any, any>>, foreignKey: "userCredentialTypeId"},
        ],
    ],
    [
        UserCredentialModel as unknown as ModelStatic<Model<any, any>>,
        [
            {model: UserModel as unknown as ModelStatic<Model<any, any>>, foreignKey: "userCredentialId"},
        ],
    ]
]);


