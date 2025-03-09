import { container } from "tsyringe";
import {IStatusRepository} from "@status/application/ports/IStatusRepository";
import {StatusRepository} from "@status/infrastructure/repositories/StatusRepository";
import {CreateStatusUseCase} from "@status/application/usecases/createStatusUseCase";
import {StatusController} from "@status/adapters/controllers/statusController";
import {ILogger} from "@coreShared/logs/ILogger";
import {Logger} from "@coreShared/logs/logger";
import {ICreateStatusUseCase} from "@status/application/ports/ICreateStatusUseCase";
import {StatusValidator} from "@status/domain/validators/StatusValidator";
import {IStatusValidator} from "@status/domain/validators/IStatusValidator";
import {IStatusController} from "@status/adapters/controllers/IStatusController";


container.register<IStatusRepository>("IStatusRepository", { useClass: StatusRepository });
container.register<ILogger>("ILogger", {useClass: Logger});
container.register<IStatusValidator>("IStatusValidator", { useClass: StatusValidator });
container.register<ICreateStatusUseCase>("ICreateStatusUseCase", { useClass: CreateStatusUseCase });
container.register<IStatusController>("IStatusController", { useClass: StatusController });

export { container };
