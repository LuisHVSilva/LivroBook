// ---------- BASE ----------
import {BaseRepositoryType, DtoBaseType} from "@coreShared/types/entity.type";
import {PhoneModel} from "@phone/infrastructure/models/phone.model";
import {PhoneEntity, PhoneProps} from "@phone/domain/entities/phone.entity";
import {AbstractControllerBaseType} from "@coreShared/types/controller.type";

export type PhoneDTO = PhoneProps;

// --------- FILTER ---------
export type PhoneFilterDTO = {
    id?: number | number[];
    number?: string | string[];
    phoneCodeDddCode?: number | number[];
    phoneCodeDdiCode?: number | number[];
    phoneType?: string | string[];
    status?: string | string[];
}

// ------- PERSISTENCE -----
export type PhonePersistenceDTO = Omit<PhoneDTO, "id">;

// ---------- CREATE ----------
export type CreatePhoneDTO = Pick<PhoneDTO, "number" | "phoneCode" | "phoneType">;
export type CreatePhoneResponseDTO = PhoneDTO;

// ---------- UPDATE ----------
export type UpdatePhoneDTO = Partial<Omit<PhoneDTO, "id">> & { id: number };
export type UpdatePhoneResponseDTO = PhoneDTO;

// ---------- FIND ----------
export type FindByIdPhoneResponseDTO = PhoneDTO;

export type FindPhonesRawDTO = {
    id: string;
    number: string;
    dddCode: string;
    ddiCode: string;
    phoneType: string;
    status: string;
    page?: string;
    limit?: string;
}
export type FindPhonesResponseDTO = {
    page: number;
    limit: number;
    totalPages: number;
    data: PhoneDTO[];
}

// ------ DTO BASE TYPE -------
export type PhoneDtoBaseType = DtoBaseType<
    PhoneDTO,
    CreatePhoneDTO,
    FindPhonesRawDTO,
    UpdatePhoneDTO,
    PhoneFilterDTO
>

// ------ BASE REPOSITORY TYPE -------
export interface PhoneNormalizedRelations {
    phoneCodeId: number;
    phoneTypeId: number;
    statusId: number;
}
export type PhoneBaseRepositoryType = BaseRepositoryType<
    PhoneModel,
    PhoneEntity,
    PhoneFilterDTO,
    PhonePersistenceDTO,
    PhoneNormalizedRelations
>;

// ------ BASE CONTROLLER TYPE -------
export type PhoneAbstractControllerBaseType = AbstractControllerBaseType<
    PhoneProps,
    CreatePhoneDTO,
    CreatePhoneResponseDTO,
    FindByIdPhoneResponseDTO,
    FindPhonesRawDTO,
    FindPhonesResponseDTO,
    UpdatePhoneDTO,
    UpdatePhoneResponseDTO
>
