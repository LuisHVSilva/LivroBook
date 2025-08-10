import {container} from "tsyringe";
import {Database} from "@coreConfig/database.config";
import {ILogger} from "@coreShared/logs/ILogger";
import {Logger} from "@coreShared/logs/Logger";
import {EntityUniquenessValidatorFactory} from "@coreShared/factories/entityUniquenessValidator.factory";
import {IBaseRepository} from "@coreShared/interfaces/IBaseRepository";
import {EntityUniquenessValidator} from "@coreShared/validators/entityUniqueness.validator";

container.registerInstance("SequelizeInstance", Database.getInstance());
container.registerSingleton<ILogger>("ILogger", Logger);
container.register<EntityUniquenessValidatorFactory>("EntityUniquenessValidatorFactory", {
    useFactory: () => {
        return <TEntity, TModel, TFilter>(
            repo: IBaseRepository<TEntity, TModel, TFilter>
        ) => new EntityUniquenessValidator<TEntity, TModel, TFilter>(repo);
    }
});

export {container}