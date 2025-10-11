// ---------- BASE ----------
import {BaseRepositoryType, DtoBaseType} from "@coreShared/types/entity.type";
import {PhoneCodeModel} from "@phone/infrastructure/models/phoneCode.model";
import {PhoneCodeEntity, PhoneCodeProps} from "@phone/domain/entities/phoneCode.entity";
import {AbstractControllerBaseType} from "@coreShared/types/controller.type";

export type PhoneCodeDTO = PhoneCodeProps;
// --------- FILTER ---------
export type PhoneCodeFilterDTO = {
    id?: number | number[];
    ddiCode?: number | number[];
    dddCode?: number | number[];
    state?: string | string[];
    status?: string | string[];
}

// ------- PERSISTENCE -----
export type PhoneCodePersistenceDTO = Omit<PhoneCodeDTO, "id">;

// ---------- CREATE ----------
export type CreatePhoneCodeDTO = Pick<PhoneCodeDTO, "ddiCode" | "dddCode" | "state">;
export type CreatePhoneCodeResponseDTO = PhoneCodeDTO;

// ---------- UPDATE ----------
export type UpdatePhoneCodeDTO = Partial<Omit<PhoneCodeDTO, "id">> & { id: number };
export type UpdatePhoneCodeResponseDTO = PhoneCodeDTO;

// ---------- FIND ----------
export type FindByIdPhoneCodeResponseDTO = PhoneCodeProps;
export type FindPhoneCodesRawDTO = {
    id?: string;
    ddiCode?: string;
    dddCode?: string;
    state?: string;
    status?: string;
    page?: string;
    limit?: string;
}
export type FindPhoneCodesResponseDTO = {
    page: number;
    limit: number;
    totalPages: number;
    data: PhoneCodeDTO[];
}

// ------ DTO BASE TYPE -------
export type PhoneCodeDtoBaseType = DtoBaseType<
    PhoneCodeDTO,
    CreatePhoneCodeDTO,
    FindPhoneCodesRawDTO,
    UpdatePhoneCodeDTO,
    PhoneCodeFilterDTO
>

// ------ BASE REPOSITORY TYPE -------
export interface PhoneCodeNormalizedRelations {
    stateId: number;
    statusId: number;
}
export type PhoneCodeBaseRepository = BaseRepositoryType<
    PhoneCodeModel,
    PhoneCodeEntity,
    PhoneCodeFilterDTO,
    PhoneCodePersistenceDTO,
    PhoneCodeNormalizedRelations
>;

// ------ BASE CONTROLLER TYPE -------
export type PhoneCodeAbstractControllerBaseType = AbstractControllerBaseType<
    PhoneCodeProps,
    CreatePhoneCodeDTO,
    CreatePhoneCodeResponseDTO,
    FindByIdPhoneCodeResponseDTO,
    FindPhoneCodesRawDTO,
    FindPhoneCodesResponseDTO,
    UpdatePhoneCodeDTO,
    UpdatePhoneCodeResponseDTO
>