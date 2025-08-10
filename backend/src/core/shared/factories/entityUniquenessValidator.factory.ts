import {IBaseRepository} from "@coreShared/interfaces/IBaseRepository";
import {EntityUniquenessValidator} from "@coreShared/validators/entityUniqueness.validator";

export type EntityUniquenessValidatorFactory = <TEntity, TModel, TFilter>(
    repo: IBaseRepository<TEntity, TModel, TFilter>
) => EntityUniquenessValidator<TEntity, TModel, TFilter>;
