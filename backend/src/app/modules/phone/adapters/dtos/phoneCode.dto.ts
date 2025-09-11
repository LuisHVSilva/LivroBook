// ---------- BASE ----------
import {BaseRepositoryType, DtoBaseType} from "@coreShared/types/entity.type";
import {PhoneCodeModel} from "@phone/infrastructure/models/phoneCode.model";
import {PhoneCodeEntity} from "@phone/domain/entities/phoneCode.entity";

export type PhoneCodeDTO = {
    id?: number;
    ddiCode: number;
    dddCode: number;
    stateId: number;
    statusId: number;
}

// --------- FILTER ---------
export type PhoneCodeFilterDTO = {
    id?: number[];
    ddiCode?: number[];
    dddCode?: number[];
    stateId?: number[];
    statusId?: number[];
    page?: number;
    limit?: number;
}

// ------- PERSISTENCE -----
export type PhoneCodePersistenceDTO = Omit<PhoneCodeDTO, "id">;

// ---------- CREATE ----------
export type CreatePhoneCodeDTO = Pick<PhoneCodeDTO,"ddiCode" | "dddCode" | "stateId">;
export type CreatePhoneCodeResponseDTO = PhoneCodeDTO;

// ---------- UPDATE ----------
export type UpdatePhoneCodeDTO = Partial<Omit<PhoneCodeDTO, "id">> & { id: number };
export type UpdatePhoneCodeResponseDTO = PhoneCodeDTO;

// ---------- FIND ----------
export type FindPhoneCodesRawDTO = {
    id?: string;
    ddiCode?: string;
    dddCode?: string;
    stateId?: string;
    statusId?: string;
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
export type PhoneCodeBaseRepository = BaseRepositoryType<PhoneCodeModel, PhoneCodeEntity, PhoneCodeFilterDTO, PhoneCodePersistenceDTO>;