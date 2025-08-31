// export interface EntityBase<TEntity> {
//     Entity: TEntity;
// }

export interface BaseRepositoryType<TModel, TEntity, TFilter, TPersistence> {
    Model: TModel;
    Entity: TEntity;
    Filter: TFilter;
    Persistence: TPersistence;
}

export interface DtoBaseType<TDto, TCreateDto, TFindDTO, TUpdateDto, TFilterDto> {
    DTO: TDto;
    CreateDTO: TCreateDto;
    FindDTO: TFindDTO;
    UpdateDTO: TUpdateDto;
    DeleteDTO: number;
    FilterDTO: TFilterDto;
}

