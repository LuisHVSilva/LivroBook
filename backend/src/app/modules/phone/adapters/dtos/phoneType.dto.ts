// ---------- BASE ----------
import {BaseRepositoryType, DtoBaseType} from "@coreShared/types/entity.type";
import {PhoneTypeModel} from "@phone/infrastructure/models/phoneType.model";
import {PhoneTypeEntity, PhoneTypeProps} from "@phone/domain/entities/phoneType.entity";
import {AbstractControllerBaseType} from "@coreShared/types/controller.type";

export type PhoneTypeDTO = PhoneTypeProps;

// --------- FILTER ---------
export type PhoneTypeFilterDTO = {
    id?: number[];
    description?: string | string[];
    status?: string | string[];
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
export type FindByIdPhoneTypeResponseDTO = PhoneTypeProps;
export type FindPhoneTypesRawDTO = {
    id?: string;
    description?: string;
    status?: string;
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
export interface PhoneTypeNormalizedRelations {
    statusId: number;
}

export type PhoneTypeBaseRepositoryType = BaseRepositoryType<
    PhoneTypeModel,
    PhoneTypeEntity,
    PhoneTypeFilterDTO,
    PhoneTypePersistenceDTO,
    PhoneTypeNormalizedRelations
>;

// ------ BASE CONTROLLER TYPE -------
export type PhoneTypeAbstractControllerBaseType = AbstractControllerBaseType<
    PhoneTypeDTO,
    CreatePhoneTypeDTO,
    CreatePhoneTypeResponseDTO,
    FindByIdPhoneTypeResponseDTO,
    FindPhoneTypesRawDTO,
    FindPhoneTypesResponseDTO,
    UpdatePhoneTypeDTO,
    UpdatePhoneTypeResponseDTO
>