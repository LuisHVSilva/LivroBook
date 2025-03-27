import {container} from "tsyringe";
import {IStatusRepository} from "@status/infrastructure/repositories/IStatusRepository";
import {StatusRepository} from "@status/infrastructure/repositories/StatusRepository";
import {CreateStatusUseCase} from "@status/application/createStatus/createStatusUseCase";
import {StatusController} from "@status/adapters/controllers/statusController";
import {ICreateStatusUseCase} from "@status/application/ports/ICreateStatusUseCase";
import {StatusValidator} from "@status/domain/validators/StatusValidator";
import {IStatusValidator} from "@status/domain/validators/IStatusValidator";
import {IStatusController} from "@status/adapters/controllers/IStatusController";
import {IGetStatusUseCase} from "@status/application/ports/IGetStatusUseCase";
import {GetStatusUseCase} from "@status/application/getStatus/getStatusUseCase";
import {UpdateDescriptionUseCase} from "@status/application/updateDescription/updateDescriptionUseCase";
import {IUpdateDescriptionUseCase} from "@status/application/ports/IUpdateDescriptionUseCase";
import {IUpdateActiveUseCase} from "@status/application/ports/IUpdateActiveUseCase";
import {UpdateActiveUseCase} from "@status/application/updateActive/updateActiveUseCase";

container.register<IStatusRepository>("IStatusRepository", {useClass: StatusRepository});
container.register<IStatusValidator>("IStatusValidator", {useClass: StatusValidator});
container.register<ICreateStatusUseCase>("ICreateStatusUseCase", {useClass: CreateStatusUseCase});
container.register<IGetStatusUseCase>("IGetStatusUseCase", {useClass: GetStatusUseCase});
container.register<IUpdateDescriptionUseCase>("IUpdateDescriptionUseCase", {useClass: UpdateDescriptionUseCase});
container.register<IUpdateActiveUseCase>("IUpdateActiveUseCase", {useClass: UpdateActiveUseCase});
container.register<IStatusController>("IStatusController", {useClass: StatusController});

export {container};
