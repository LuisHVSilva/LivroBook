// ---------- BASE ----------
import {BaseRepositoryType, DtoBaseType} from "@coreShared/types/entity.type";
import {PhoneModel} from "@phone/infrastructure/models/phone.model";
import {PhoneEntity} from "@phone/domain/entities/phone.entity";

export type PhoneDTO = {
    id?: number;
    number: string;
    phoneCodeId: number;
    phoneTypeId: number;
    statusId: number;
}

// --------- FILTER ---------
export type PhoneFilterDTO = {
    id?: number[];
    number?: string[];
    phoneCodeId?: number[];
    phoneTypeId?: number[];
    statusId?: number[];
    page?: number;
    limit?: number;
}

// ------- PERSISTENCE -----
export type PhonePersistenceDTO = Omit<PhoneDTO, "id">;

// ---------- CREATE ----------
export type CreatePhoneDTO = Pick<PhoneDTO, "number" | "phoneCodeId" |"phoneTypeId">;
export type CreatePhoneResponseDTO = PhoneDTO;

// ---------- UPDATE ----------
export type UpdatePhoneDTO = Partial<Omit<PhoneDTO, "id">> & { id: number };
export type UpdatePhoneResponseDTO = PhoneDTO;

// ---------- FIND ----------
export type FindPhonesRawDTO = {
    id: string;
    number: string;
    phoneCodeId: string;
    phoneTypeId: string;
    statusId: string;
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
export type PhoneBaseRepositoryType = BaseRepositoryType<PhoneModel, PhoneEntity, PhoneFilterDTO, PhonePersistenceDTO>;
