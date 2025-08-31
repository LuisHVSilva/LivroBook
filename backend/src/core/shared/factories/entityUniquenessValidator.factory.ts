import {IRepositoryBase} from "@coreShared/base/interfaces/IRepositoryBase";
import {EntityUniquenessValidator} from "@coreShared/validators/entityUniqueness.validator";
import {BaseRepositoryType} from "@coreShared/types/entity.type";

export type EntityUniquenessValidatorFactory = <TEntity, TModel, TFilter>(
    repo: IRepositoryBase<BaseRepositoryType<TEntity, TModel, TFilter, any>>
) => EntityUniquenessValidator<BaseRepositoryType<TEntity, TModel, TFilter, any>>
