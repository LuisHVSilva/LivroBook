import "reflect-metadata";
import {inject, injectable} from "tsyringe";
import {IStatusRepository} from "@status/infrastructure/repositories/IStatusRepository";
import {ILogger} from "@coreShared/logs/ILogger";
import {IUpdateDescriptionUseCase} from "@status/application/updateDescription/IUpdateDescriptionUseCase";
import {StringUtils} from "@coreShared/utils/StringUtils";
import {Status} from "@status/domain/status";
import {Result} from "@coreShared/types/Result";
import {UpdateDescriptionDTO, UpdateDescriptionResponseDTO} from "@status/adapters/dtos/UpdateDescriptionDTO";
import {UseCaseError} from "@coreShared/errors/useCaseError";
import {LoggerMessages} from "@coreShared/messages/loggerMessages";
import {StatusMessages} from "@coreShared/messages/statusMessages";
import {IStatusDomainService} from "@status/domain/service/IStatusDomainService";
import {ErrorMessages} from "@coreShared/messages/errorMessages";

@injectable()
export class UpdateDescriptionUseCase implements IUpdateDescriptionUseCase {
    private readonly className: string = "UpdateDescriptionUseCase";

    constructor(
        @inject("IStatusDomainService") private readonly statusDomainService: IStatusDomainService,
        @inject("IStatusRepository") private readonly statusRepository: IStatusRepository,
        @inject("ILogger") private readonly logger: ILogger,
    ) {
    }

    public async execute(input: UpdateDescriptionDTO): Promise<Result<UpdateDescriptionResponseDTO>> {
        const method: string = "execute";
        await this.logger.logInfo(this.className, method, LoggerMessages.Info.START_EXECUTION);

        const transaction = await this.statusRepository.startTransaction();
        try {
            const id: number = StringUtils.strToNumber(input.id, StatusMessages.Error.Validation.ID_TYPE)
            const newDescription: string = input.newDescription
            const existingStatus: Status = await this.statusDomainService.ensureStatusExists(id);
            const newStatus: Status = await existingStatus.updateDescription(newDescription, this.statusDomainService);

            await this.statusRepository.updateDescription(id, newDescription);
            await transaction.commit();

            const successMessage: string = StatusMessages
                .Success.Update(existingStatus.getDescription(), newStatus.getDescription());

            await this.logger.logInfo(this.className, method, successMessage);

            return Result.success<UpdateDescriptionResponseDTO>({
                message: successMessage,
                newDescription: newStatus.getDescription()
            });
        } catch (e) {
            await transaction.rollback();
            const message: string = e instanceof Error ? e.message : ErrorMessages.Internal.INTERNAL_ERROR;
            const error = new UseCaseError(this.className, message);
            await this.logger.logError(this.className, method, error);
            return Result.failure(error)
        }
    };
}