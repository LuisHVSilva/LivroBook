import "reflect-metadata";
import {inject, injectable} from "tsyringe";
import {IStatusRepository} from "../ports/IStatusRepository";
import {Status} from "../../domain/status";
import {ICreateStatusUseCase} from "../ports/ICreateStatusUseCase";
import {IStatusValidator} from "../../domain/validators/IStatusValidator";
import {Messages} from "@coreShared/constants/messages";
import {ILogger} from "@coreShared/logs/ILogger";
import {Result} from "@coreShared/types/Result";
import {CreateStatusDTO, CreateStatusResponseDTO} from "@status/adapters/dtos/CreateStatusDTO";

@injectable()
export class CreateStatusUseCase implements ICreateStatusUseCase {
    private readonly className: string = 'CreateStatusUseCase';

    constructor(
        @inject("IStatusRepository") private readonly statusRepository: IStatusRepository,
        @inject("ILogger") private readonly logger: ILogger,
        @inject("IStatusValidator") private readonly statusValidator: IStatusValidator
    ) {
    }

    public async execute(input: CreateStatusDTO): Promise<Result<CreateStatusResponseDTO>> {
        const method = "execute";
        const transaction = await this.statusRepository.startTransaction();

        try {
            this.logger.logInfo(this.className, method, Messages.Logger.Info.START_EXECUTION);

            await this.statusValidator.validateUniqueDescription(input.description);

            const newStatus: Status = Status.create(input.description);
            const savedStatus: Result<Status> = await this.statusRepository.save(newStatus);

            await transaction.commit();

            this.logger.logInfo(this.className,
                method,
                Messages.Status.Success.CREATED(savedStatus.getValue().getDescription())
            );

            return Result.success<CreateStatusResponseDTO>({
                message: Messages.Status.Success.CREATED(savedStatus.getValue().getDescription()),
                id: savedStatus.getValue().getId()!.toString(),
                description: savedStatus.getValue().getDescription(),
            });
        } catch (error) {
            await transaction.rollback();
            this.logger.logError(this.className, method, error as Error);

            const message = error instanceof Error ? error.message : Messages.Status.Error.UPDATED_FAILED;
            return Result.failure(message);
        }
    };
}
