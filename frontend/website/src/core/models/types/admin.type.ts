import type {BaseEntityType, EntityDomainBase} from "../../entities/entity.domain.base.ts";

export type GetAllEntitiesNamesDTO = Record<string, Record<string, string>>;

export type EntityProperty = {
    columnName: string;
    dataType: string;
    allowNull: boolean;
    maxLength?: number;
    minLength?: number;
}
export type GetAllModelAttributesResponseDTO = EntityProperty[];


export type FindAllProps<TProps extends BaseEntityType> = {
    page: number;
    limit: number;
    totalPages: number;
    data: TProps[];
}

export type FindAllType<TDomain extends EntityDomainBase<any>> = {
    page: number;
    limit: number;
    totalPages: number;
    data: TDomain[];
};

export type FindById<TDomain extends EntityDomainBase<any>> = TDomain;

export type FindByIdAdmin<T = Record<string, unknown>> = Record<keyof T, { value: string; label: string }>