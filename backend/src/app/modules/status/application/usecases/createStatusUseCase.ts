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
import {UseCaseError} from "@coreShared/errors/UseCaseError";

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
            const savedStatusValue: Status = savedStatus.getValue();

            const successMessage: string = Messages.Status.Success.CREATED(savedStatusValue.getDescription());
            this.logger.logInfo(this.className, method, successMessage);

            return Result.success<CreateStatusResponseDTO>({
                message: successMessage,
                id: savedStatusValue.getId()!.toString(),
                description: savedStatusValue.getDescription(),
            });

        } catch (error) {
            this.logger.logError(this.className, method, error as Error);
            await transaction.rollback();
            const message: string = error instanceof Error ? error.message : Messages.Status.Error.CREATION_FAILED;
            throw new UseCaseError(this.className, message);
        }
    };
}
