import {container} from "tsyringe";
import {Database} from "@coreConfig/database/database.config";
import {ILogger} from "@coreConfig/logs/ILogger";
import {Logger} from "@coreConfig/logs/Logger";
import {EntityUniquenessValidatorFactory} from "@coreShared/factories/entityUniquenessValidator.factory";
import {IRepositoryBase} from "@coreShared/base/interfaces/IRepositoryBase";
import {EntityUniquenessValidator} from "@coreShared/validators/entityUniqueness.validator";
import {BaseRepositoryType} from "@coreShared/types/entity.type";

container.registerInstance("SequelizeInstance", Database.getInstance());
container.registerSingleton<ILogger>("ILogger", Logger);
container.register<EntityUniquenessValidatorFactory>("EntityUniquenessValidatorFactory", {
    useFactory: () => {
        return <TModel, TEntity, TFilter, TPersistence, TNormalizedRelations>(
            repo: IRepositoryBase<BaseRepositoryType<TModel, TEntity, TFilter, TPersistence, TNormalizedRelations>>
        ) =>
            new EntityUniquenessValidator<BaseRepositoryType<TModel, TEntity, TFilter, TPersistence, TNormalizedRelations>>(repo);
    }
});

export {container}