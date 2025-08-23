export interface EntityType<TEntity, TModel, TDto, TCreateDto, TUpdateDto, TFilterDto> {
    Entity: TEntity;
    Model: TModel;
    DTO: TDto;
    CreateDTO: TCreateDto;
    UpdateDTO: TUpdateDto;
    FilterDTO: TFilterDto;
}
