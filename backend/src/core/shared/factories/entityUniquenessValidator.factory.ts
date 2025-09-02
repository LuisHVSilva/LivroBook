import {IRepositoryBase} from "@coreShared/base/interfaces/IRepositoryBase";
import {EntityUniquenessValidator} from "@coreShared/validators/entityUniqueness.validator";
import {BaseRepositoryType} from "@coreShared/types/entity.type";

export type EntityUniquenessValidatorFactory = <TModel, TEntity, TFilter, TPersistence>(
    repo: IRepositoryBase<BaseRepositoryType<TModel, TEntity, TFilter, TPersistence>>
) => EntityUniquenessValidator<
    BaseRepositoryType<TModel, TEntity, TFilter, TPersistence>
>;
