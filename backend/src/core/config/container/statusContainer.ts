import {container} from "tsyringe";
import {IStatusDomainService} from "@status/domain/service/IStatusDomainService";
import {StatusDomainService} from "@status/domain/service/statusDomainService";
import {IStatusRepository} from "@status/infrastructure/repositories/IStatusRepository";
import {StatusRepository} from "@status/infrastructure/repositories/StatusRepository";
import {ICreateStatusUseCase} from "@status/application/createStatus/ICreateStatusUseCase";
import {CreateStatusUseCase} from "@status/application/createStatus/createStatusUseCase";
import {IGetStatusUseCase} from "@status/application/getStatus/IGetStatusUseCase";
import {GetStatusUseCase} from "@status/application/getStatus/getStatusUseCase";
import {IUpdateActiveUseCase} from "@status/application/updateActive/IUpdateActiveUseCase";
import {UpdateActiveUseCase} from "@status/application/updateActive/updateActiveUseCase";
import {IUpdateDescriptionUseCase} from "@status/application/updateDescription/IUpdateDescriptionUseCase";
import {UpdateDescriptionUseCase} from "@status/application/updateDescription/updateDescriptionUseCase";
import {IStatusController} from "@status/adapters/controllers/IStatusController";
import {StatusController} from "@status/adapters/controllers/statusController";

container.registerSingleton<IStatusDomainService>("IStatusDomainService", StatusDomainService);
container.registerSingleton<IStatusRepository>("IStatusRepository", StatusRepository);
container.registerSingleton<ICreateStatusUseCase>("ICreateStatusUseCase",CreateStatusUseCase);
container.registerSingleton<IGetStatusUseCase>("IGetStatusUseCase", GetStatusUseCase);
container.registerSingleton<IUpdateActiveUseCase>("IUpdateActiveUseCase", UpdateActiveUseCase);
container.registerSingleton<IUpdateDescriptionUseCase>("IUpdateDescriptionUseCase", UpdateDescriptionUseCase);
container.registerSingleton<IStatusController>("IStatusController", StatusController);

export {container};
