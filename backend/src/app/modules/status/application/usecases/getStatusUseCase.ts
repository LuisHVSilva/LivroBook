import "reflect-metadata";
import {inject, injectable} from "tsyringe";
import {IGetStatusUseCase} from "@status/application/ports/IGetStatusUseCase";
import {IStatusRepository} from "@status/application/ports/IStatusRepository";
import {ILogger} from "@coreShared/logs/ILogger";
import {Status} from "@status/domain/status";
import {Messages} from "@coreShared/constants/messages";
import {Result} from "@coreShared/types/Result";
import {GetStatusDTO, GetStatusResponseDTO} from "@status/adapters/dtos/GetStatusDTO";

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
        const transaction = await this.statusRepository.startTransaction();

        try {
            this.logger.logInfo(this.className, method, Messages.Logger.Info.START_EXECUTION);

            const status: Result<Status> = await this.statusRepository.findById(parseInt(input.id));
            await transaction.commit();

            return Result.success<GetStatusResponseDTO>({
                message: Messages.Status.Success.FOUND_BY_ID,
                id: status.getValue().getId()!,
                description: status.getValue().getDescription(),
                active: status.getValue().getActive(),
            });
        } catch (error) {
            await transaction.rollback();
            this.logger.logError(this.className, method, error as Error);

            const message = error instanceof Error ? error.message : Messages.Status.Error.NOT_FOUND;
            return Result.failure<GetStatusResponseDTO>(message);
        }
    };
}