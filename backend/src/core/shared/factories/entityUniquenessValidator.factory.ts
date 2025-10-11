import {IRepositoryBase} from "@coreShared/base/interfaces/IRepositoryBase";
import {EntityUniquenessValidator} from "@coreShared/validators/entityUniqueness.validator";
import {BaseRepositoryType} from "@coreShared/types/entity.type";

export type EntityUniquenessValidatorFactory = <TModel, TEntity, TFilter, TPersistence, TNormalizedRelations>(
    repo: IRepositoryBase<BaseRepositoryType<TModel, TEntity, TFilter, TPersistence, TNormalizedRelations>>
) => EntityUniquenessValidator<
    BaseRepositoryType<TModel, TEntity, TFilter, TPersistence, TNormalizedRelations>
>;
