import { container } from "tsyringe";
import {IStatusRepository} from "../../../app/modules/status/application/ports/IStatusRepository";
import {StatusRepository} from "../../../app/modules/status/infrastructure/repositories/StatusRepository";
import {CreateStatusUseCase} from "../../../app/modules/status/application/usecases/createStatusUseCase";
import {StatusController} from "../../../app/modules/status/adapters/controllers/statusController";
import {ILogger} from "../../shared/logs/ILogger";
import {Logger} from "../../shared/logs/logger";


container.register<IStatusRepository>("IStatusRepository", { useClass: StatusRepository });
container.register<ILogger>("ILogger", {useClass: Logger});
container.register("CreateStatusUseCase", { useClass: CreateStatusUseCase });
container.register("StatusController", { useClass: StatusController });

export { container };
