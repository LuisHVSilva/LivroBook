// ---------- BASE ----------
import {BaseRepositoryType, DtoBaseType} from "@coreShared/types/entity.type";
import {PhoneTypeModel} from "@phone/infrastructure/models/phoneType.model";
import {PhoneTypeEntity} from "@phone/domain/entities/phoneType.entity";

export type PhoneTypeDTO = {
    id?: number;
    description: string;
    statusId: number;
};

// --------- FILTER ---------
export type PhoneTypeFilterDTO = {
    id?: number[];
    description?: string[];
    statusId?: number[];
    page?: number;
    limit?: number;
}

// ------- PERSISTENCE ------
export type PhoneTypePersistenceDTO = Omit<PhoneTypeDTO, "id">;

// ---------- CREATE ----------
export type CreatePhoneTypeDTO = Pick<PhoneTypeDTO, "description">;
export type CreatePhoneTypeResponseDTO = PhoneTypeDTO;

// ---------- UPDATE ----------
export type UpdatePhoneTypeDTO = Partial<Omit<PhoneTypeDTO, "id">> & { id: number };
export type UpdatePhoneTypeResponseDTO = PhoneTypeDTO;

// ---------- FIND ----------
export type FindPhoneTypesRawDTO = {
    id?: string;
    description?: string;
    statusId?: string;
    page?: string;
    limit?: string;
};
export type FindPhoneTypesResponseDTO = {
    page?: number;
    limit?: number;
    totalPages?: number;
    data: PhoneTypeDTO[];
}

// ------ DTO BASE TYPE -------
export type PhoneTypeDtoBaseType = DtoBaseType<
    PhoneTypeDTO,
    CreatePhoneTypeDTO,
    FindPhoneTypesRawDTO,
    UpdatePhoneTypeDTO,
    PhoneTypeFilterDTO
>

// ------ BASE REPOSITORY TYPE -------
export type PhoneTypeBaseRepositoryType = BaseRepositoryType<
    PhoneTypeModel,
    PhoneTypeEntity,
    PhoneTypeFilterDTO,
    PhoneTypePersistenceDTO
>;