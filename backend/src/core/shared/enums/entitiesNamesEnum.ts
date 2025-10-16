import {EntityMap} from "@modules/metadata/adapters/dtos/metadata.dto";

export enum EntitiesNamesEnum {
    DocumentType = "documentType",
    City = "city",
    State = "state",
    Country = "country",
    Phone = "phone",
    PhoneCode = "phoneCode",
    PhoneType = "phoneType",
    Status = "status",
    User = "user",
    UserCredential = "userCredential",
    UserCredentialType = "userCredentialType",
    UserType = "userType",
}

export const EntitiesList: Record<string, EntityMap> = {
    Documento: {
        tipo_documento: EntitiesNamesEnum.DocumentType,
    },
    Localidade: {
        cidade: EntitiesNamesEnum.City,
        estado: EntitiesNamesEnum.State,
        pais: EntitiesNamesEnum.Country,
    },
    Telefone: {
        telefone: EntitiesNamesEnum.Phone,
        codigo_telefone: EntitiesNamesEnum.PhoneCode,
        tipo_telefone: EntitiesNamesEnum.PhoneType,
    },
    Sistema: {
        status: EntitiesNamesEnum.Status,
    },
    Usuario: {
        usuario: EntitiesNamesEnum.User,
        // credencial_usuario: EntitiesNamesEnum.UserCredential,
        tipo_credencial_usuario: EntitiesNamesEnum.UserCredentialType,
        tipo_usuario: EntitiesNamesEnum.UserType,
    },
};


// export const EntitiesList = {
//     Document: [
//         EntitiesNamesEnum.DocumentType,
//     ],
//     Localidade: [
//         EntitiesNamesEnum.City,
//         EntitiesNamesEnum.State,
//         EntitiesNamesEnum.Country,
//     ],
//     Telefone: [
//         EntitiesNamesEnum.Phone,
//         EntitiesNamesEnum.PhoneCode,
//         EntitiesNamesEnum.PhoneType,
//     ],
//     Sistema: [
//         EntitiesNamesEnum.Status,
//     ],
//     Usuario: [
//         EntitiesNamesEnum.User,
//         EntitiesNamesEnum.UserCredential,
//         EntitiesNamesEnum.UserCredentialType,
//         EntitiesNamesEnum.UserType,
//     ],
// };
