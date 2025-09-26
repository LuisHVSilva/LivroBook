// ---------- BASE ----------
import {BaseRepositoryType, DtoBaseType} from "@coreShared/types/entity.type";
import {PublisherEntity, PublisherProps} from "@modules/book/domain/entities/publisher.entity";
import {PublisherModel} from "@modules/book/infrastructure/models/publisher.model";

export type PublisherDTO = PublisherProps;

//---------- FILTER ---------
export type PublisherFilterDTO = {
    id?: number[];
    name?: string[];
    statusId?: number[];
    page?: number;
    limit?: number;
};

// ------- PERSISTENCE ------
export type PublisherPersistenceDTO = Omit<PublisherDTO, "id">;

// ---------- CREATE ----------
export type CreatePublisherDTO = Pick<PublisherDTO, "name">;
export type CreatePublisherResponseDTO = PublisherDTO;

// ---------- UPDATE ----------
export type UpdatePublisherDTO = Partial<Omit<PublisherDTO, "id">> & { id: number };
export type UpdatePublisherResponseDTO = PublisherDTO;

// ---------- FIND ----------
export type FindPublishersRawDTO = {
    id?: string;
    name?: string;
    countryId?: string;
    statusId?: string;
    page?: string;
    limit?: string;
};
export type PublishersResponseDTO = {
    page: number;
    limit: number;
    totalPages: number;
    data: PublisherDTO[];
};

// ------ DTO BASE TYPE -------
export type PublisherDtoBaseType = DtoBaseType<
    PublisherDTO,
    CreatePublisherDTO,
    FindPublishersRawDTO,
    UpdatePublisherDTO,
    PublisherFilterDTO
>

// ------ BASE REPOSITORY TYPE -------
export type PublisherBaseRepositoryType = BaseRepositoryType<
    PublisherModel,
    PublisherEntity,
    PublisherFilterDTO,
    PublisherPersistenceDTO
>;
