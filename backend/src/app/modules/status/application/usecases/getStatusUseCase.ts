import "reflect-metadata";
import {inject, injectable} from "tsyringe";
import {IGetStatusUseCase} from "@status/application/ports/IGetStatusUseCase";
import {IStatusRepository} from "@status/application/ports/IStatusRepository";
import {ILogger} from "@coreShared/logs/ILogger";
import {Status} from "@status/domain/status";
import {Messages} from "@coreShared/constants/messages";
import {Result} from "@coreShared/types/Result";
import {GetStatusDTO, GetStatusResponseDTO} from "@status/adapters/dtos/GetStatusDTO";
import {UseCaseError} from "@coreShared/errors/UseCaseError";

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
        try {
            this.logger.logInfo(this.className, method, Messages.Logger.Info.START_EXECUTION);

            const status: Result<Status> = await this.statusRepository.findById(parseInt(input.id));

            if (status.isFailure()) {
                return Result.failure<GetStatusResponseDTO>(status.getError());
            }

            const statusValue: Status = status.getValue();
            return Result.success<GetStatusResponseDTO>({
                message: Messages.Status.Success.FOUND_BY_ID,
                id: statusValue.getId()!.toString(),
                description: statusValue.getDescription(),
                active: statusValue.getActive(),
            });
        } catch (error) {
            this.logger.logError(this.className, method, error as Error);

            const message: string = error instanceof Error ? error.message : Messages.Status.Error.NOT_FOUND;
            throw new UseCaseError(this.className, message);
        }
    };
}