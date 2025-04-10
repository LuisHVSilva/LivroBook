import "reflect-metadata";
import {inject, injectable} from "tsyringe";
import {IGetStatusUseCase} from "@status/application/getStatus/IGetStatusUseCase";
import {IStatusRepository} from "@status/infrastructure/repositories/IStatusRepository";
import {ILogger} from "@coreShared/logs/ILogger";
import {Status} from "@status/domain/status";
import {Result} from "@coreShared/types/Result";
import {GetStatusDTO, GetStatusResponseDTO} from "@status/adapters/dtos/GetStatusDTO";
import {UseCaseError} from "@coreShared/errors/useCaseError";
import {RepositoryError} from "@coreShared/errors/RepositoryError";
import {LoggerMessages} from "@coreShared/messages/loggerMessages";
import {StatusMessages} from "@coreShared/messages/statusMessages";
import {ErrorMessages} from "@coreShared/messages/errorMessages";
import {StringUtils} from "@coreShared/utils/StringUtils";

@injectable()
export class GetStatusUseCase implements IGetStatusUseCase {
    private readonly className: string = "GetStatusUseCase";

    constructor(
        @inject("IStatusRepository") private readonly statusRepository: IStatusRepository,
        @inject("ILogger") private readonly logger: ILogger,
    ) {
    }

    public async execute(input: GetStatusDTO): Promise<Result<GetStatusResponseDTO>> {
        const method = "execute";
        await this.logger.logInfo(this.className, method, LoggerMessages.Info.START_EXECUTION);

        try {
            const id: number = StringUtils.strToNumber(input.id, StatusMessages.Error.Validation.ID_TYPE)
            const statusResult: Result<Status,RepositoryError> = await this.statusRepository.findById(id);

            if (statusResult.isFailure() || statusResult.isNone()) {
                return Result.failure(new UseCaseError(this.className, StatusMessages.Error.Retrieval.ID_NOT_FOUND(id)));
            }

            const status = statusResult.unwrapOrThrow(Status.restore);

            const response: GetStatusResponseDTO = {
                message: StatusMessages.Success.Retrieval.FOUND_BY_ID,
                id: status.getId()!.toString(),
                description: status.getDescription(),
                active: status.getActive(),
            };

            await this.logger.logInfo(this.className, method, LoggerMessages.Info.EXECUTION_SUCCESS);
            return Result.success(response);
        } catch (error) {
            let message: string = ErrorMessages.Internal.INTERNAL_ERROR;

            if(error instanceof Error) {
                await this.logger.logError(this.className, method, error);
                message = error.message;
            }

            return Result.failure(new UseCaseError(this.className, message));
        }
    }

}