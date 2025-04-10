import "reflect-metadata";
import {IUpdateActiveUseCase} from "@status/application/updateActive/IUpdateActiveUseCase";
import {inject, injectable} from "tsyringe";
import {IStatusRepository} from "@status/infrastructure/repositories/IStatusRepository";
import {ILogger} from "@coreShared/logs/ILogger";
import {UpdateActiveDTO, UpdateActiveResponseDTO} from "@status/adapters/dtos/UpdateActiveDTO";
import {Result} from "@coreShared/types/Result";
import {UseCaseError} from "@coreShared/errors/useCaseError";
import {StringUtils} from "@coreShared/utils/StringUtils";
import {LoggerMessages} from "@coreShared/messages/loggerMessages";
import {StatusMessages} from "@coreShared/messages/statusMessages";
import {ErrorMessages} from "@coreShared/messages/errorMessages";
import {Status} from "@status/domain/status";
import {IStatusDomainService} from "@status/domain/service/IStatusDomainService";

@injectable()
export class UpdateActiveUseCase implements IUpdateActiveUseCase {
    private readonly className: string = "UpdateActiveUseCase";

    constructor(
        @inject("IStatusDomainService") private readonly statusDomainService: IStatusDomainService,
        @inject("IStatusRepository") private readonly statusRepository: IStatusRepository,
        @inject("ILogger") private readonly logger: ILogger,
    ) {
    }

    public async execute(input: UpdateActiveDTO): Promise<Result<UpdateActiveResponseDTO>> {
        const method: string = "execute";
        await this.logger.logInfo(this.className, method, LoggerMessages.Info.START_EXECUTION);

        const transaction = await this.statusRepository.startTransaction();
        try {
            const id: number = StringUtils.strToNumber(input.id, StatusMessages.Error.Validation.ID_TYPE)
            const newActive: boolean = input.active;

            const existingStatus: Status = await this.statusDomainService.ensureStatusExists(id);
            const updatedStatus: Status = newActive ? existingStatus.activate() : existingStatus.deactivate();
            await this.statusRepository.updateActive(updatedStatus.getId()!, updatedStatus.getActive());

            await transaction.commit();
            return Result.success<UpdateActiveResponseDTO>({
                message: newActive
                    ? StatusMessages.Success.Activation.ACTIVATED : StatusMessages.Success.Activation.DEACTIVATED
            });
        } catch (e) {
            await transaction.rollback();
            const message: string = e instanceof Error ? e.message : ErrorMessages.Internal.INTERNAL_ERROR;
            const error = new UseCaseError(this.className, message);
            await this.logger.logError(this.className, method, error);
            return Result.failure(error)
        }
    }
}