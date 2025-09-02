import {container} from "tsyringe";
import {Database} from "@coreConfig/database.config";
import {ILogger} from "@coreShared/logs/ILogger";
import {Logger} from "@coreShared/logs/Logger";
import {EntityUniquenessValidatorFactory} from "@coreShared/factories/entityUniquenessValidator.factory";
import {IRepositoryBase} from "@coreShared/base/interfaces/IRepositoryBase";
import {EntityUniquenessValidator} from "@coreShared/validators/entityUniqueness.validator";
import {BaseRepositoryType} from "@coreShared/types/entity.type";

container.registerInstance("SequelizeInstance", Database.getInstance());
container.registerSingleton<ILogger>("ILogger", Logger);
container.register<EntityUniquenessValidatorFactory>("EntityUniquenessValidatorFactory", {
    useFactory: () => {
        return <TModel, TEntity, TFilter, TPersistence>(
            repo: IRepositoryBase<BaseRepositoryType<TModel, TEntity, TFilter, TPersistence>>
        ) =>
            new EntityUniquenessValidator<BaseRepositoryType<TModel, TEntity, TFilter, TPersistence>>(repo);
    }
});

export {container}