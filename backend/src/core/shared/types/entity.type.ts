// export interface EntityBase<TEntity> {
//     Entity: TEntity;
// }

export interface BaseRepositoryType<TModel, TEntity, TFilter, TPersistence, TNormalizedRelations> {
    Model: TModel;
    Entity: TEntity;
    Filter: TFilter;
    Persistence: TPersistence;
    NormalizedRelations: TNormalizedRelations;
}

export interface DtoBaseType<TDto, TCreateDto, TFindDTO, TUpdateDto, TFilterDto> {
    DTO: TDto;
    CreateDTO: TCreateDto;
    FindDTO: TFindDTO;
    UpdateDTO: TUpdateDto;
    DeleteDTO: number;
    FilterDTO: TFilterDto;
}

