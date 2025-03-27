import "reflect-metadata";
import {IUpdateActiveUseCase} from "@status/application/ports/IUpdateActiveUseCase";
import {inject, injectable} from "tsyringe";
import {IStatusRepository} from "@status/infrastructure/repositories/IStatusRepository";
import {ILogger} from "@coreShared/logs/ILogger";
import {IStatusValidator} from "@status/domain/validators/IStatusValidator";
import {UpdateActiveDTO, UpdateActiveResponseDTO} from "@status/adapters/dtos/UpdateActiveDTO";
import {Result} from "@coreShared/types/Result";
import {Messages} from "@coreShared/messages/messages";
import {UseCaseError} from "@coreShared/errors/UseCaseError";
import {StringUtils} from "@coreShared/utils/StringUtils";
import {Status} from "@status/domain/status";

@injectable()
export class UpdateActiveUseCase implements IUpdateActiveUseCase {
    private readonly className: string = "UpdateActiveUseCase";

    constructor(
        @inject("IStatusRepository") private readonly statusRepository: IStatusRepository,
        @inject("IStatusValidator") private readonly statusValidator: IStatusValidator,
        @inject("ILogger") private readonly logger: ILogger,
    ) {
    }

    public async execute(input: UpdateActiveDTO): Promise<Result<UpdateActiveResponseDTO>> {
        const method: string = "execute";
        const transaction = await this.statusRepository.startTransaction();
        const id: string = input.id;
        const newState: boolean = input.active;

        try {
            this.logger.logInfo(this.className, method, Messages.Logger.Info.START_EXECUTION);

            const numberId: number = StringUtils.strToNumber(id, Messages.Status.Error.INVALID_ID(id))
            const existingStatus: Status = await this.statusValidator.validateExistingStatus(numberId);

            const updatedStatus: Status = newState ? existingStatus.activate() : existingStatus.deactivate();
            const message: string = newState ? Messages.Status.Success.ACTIVATED : Messages.Status.Success.DEACTIVATED;

            await this.statusRepository.updateActive(updatedStatus);
            await transaction.commit();

            return Result.success<UpdateActiveResponseDTO>({
                message: message
            });
        } catch (error) {
            this.logger.logError(this.className, method, error as Error);
            await transaction.rollback();
            const message: string = error instanceof Error ? error.message : Messages.Status.Error.UPDATED_FAILED;
            throw new UseCaseError(this.className, message);
        }
    }
}