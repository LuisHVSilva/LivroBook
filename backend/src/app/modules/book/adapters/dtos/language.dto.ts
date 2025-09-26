// ---------- BASE ----------
import {BaseRepositoryType, DtoBaseType} from "@coreShared/types/entity.type";
import {LanguageEntity, LanguageProps} from "@modules/book/domain/entities/language.entity";
import {LanguageModel} from "@modules/book/infrastructure/models/language.model";

export type LanguageDTO = LanguageProps;

//---------- FILTER ---------
export type LanguageFilterDTO = {
    id?: number[];
    description?: string[];
    statusId?: number[];
    page?: number;
    limit?: number;
};

// ------- PERSISTENCE ------
export type LanguagePersistenceDTO = Omit<LanguageDTO, "id">;

// ---------- CREATE ----------
export type CreateLanguageDTO = Pick<LanguageDTO, "description">;
export type CreateLanguageResponseDTO = LanguageDTO;

// ---------- UPDATE ----------
export type UpdateLanguageDTO = Partial<Omit<LanguageDTO, "id">> & { id: number };
export type UpdateLanguageResponseDTO = LanguageDTO;

// ---------- FIND ----------
export type FindLanguagesRawDTO = {
    id?: string;
    description?: string;
    countryId?: string;
    statusId?: string;
    page?: string;
    limit?: string;
};
export type LanguagesResponseDTO = {
    page: number;
    limit: number;
    totalPages: number;
    data: LanguageDTO[];
};

// ------ DTO BASE TYPE -------
export type LanguageDtoBaseType = DtoBaseType<
    LanguageDTO,
    CreateLanguageDTO,
    FindLanguagesRawDTO,
    UpdateLanguageDTO,
    LanguageFilterDTO
>

// ------ BASE REPOSITORY TYPE -------
export type LanguageBaseRepositoryType = BaseRepositoryType<
    LanguageModel,
    LanguageEntity,
    LanguageFilterDTO,
    LanguagePersistenceDTO
>;
