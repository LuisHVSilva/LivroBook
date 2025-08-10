import {container} from "tsyringe";
import {IStatusRepository} from "@status/infrastructure/repositories/IStatusRepository";
import {IStatusController} from "@status/adapters/controllers/IStatus.controller";
import {StatusController} from "@status/adapters/controllers/status.controller";
import {StatusRepository} from "@status/infrastructure/repositories/status.repository";
import {ICreateStatusUseCase} from "@status/useCases/createStatus/ICreateStatus.useCase";
import {CreateStatusUseCase} from "@status/useCases/createStatus/createStatus.useCase";
import {StatusMapper} from "@status/infrastructure/mappers/status.mapper";
import {IFindStatusesUseCase} from "@status/useCases/findStatus/IFindStatuses.useCase";
import {FindStatusesUseCase} from "@status/useCases/findStatus/findStatuses.useCase";
import {IUpdateStatusUseCase} from "@status/useCases/updateStatus/IUpdateStatus.useCase";
import {UpdateStatusUseCase} from "@status/useCases/updateStatus/updateStatus.useCase";
import {IDeleteStatusUseCase} from "@status/useCases/deleteStatus/IDeleteStatus.useCase";
import {DeleteStatusUseCase} from "@status/useCases/deleteStatus/deleteStatus.useCase";
import {StatusService} from "@status/domain/services/status.service";
import {EntityUniquenessValidator} from "@coreShared/validators/entityUniqueness.validator";
import {StatusEntity} from "@status/domain/entities/status.entity";
import {StatusDto} from "@status/adapters/dtos/status.dto";
import {IBaseRepository} from "@coreShared/interfaces/IBaseRepository";
import {IStatusService} from "@status/domain/services/interfaces/IStatus.service";

//#region Services
container.registerSingleton<IStatusService>("IStatusService", StatusService);
//#endregion

//#region UseCases
container.registerSingleton<ICreateStatusUseCase>("ICreateStatusUseCase", CreateStatusUseCase);
container.registerSingleton<IFindStatusesUseCase>("IFindStatusesUseCase", FindStatusesUseCase);
container.registerSingleton<IUpdateStatusUseCase>("IUpdateStatusUseCase", UpdateStatusUseCase);
container.registerSingleton<IDeleteStatusUseCase>("IDeleteStatusUseCase", DeleteStatusUseCase);
// #endregion

//#region Infrastructure
container.registerSingleton<StatusMapper>("StatusMapper", StatusMapper);
container.registerSingleton<IStatusRepository>("IStatusRepository", StatusRepository);
//#endregion

//#region Adapters
container.registerSingleton<IStatusController>("IStatusController", StatusController);
//#endregion

//#region Validators
container.registerSingleton<EntityUniquenessValidator<StatusEntity, StatusMapper, StatusDto>>("StatusUniquenessValidator", EntityUniquenessValidator);
container.registerSingleton<IBaseRepository<any, any, any>>("StatusRepository", StatusRepository);
//#endregion

export {container};
