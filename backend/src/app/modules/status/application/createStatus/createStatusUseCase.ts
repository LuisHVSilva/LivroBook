import "reflect-metadata";
import {inject, injectable} from "tsyringe";
import {IStatusRepository} from "../../infrastructure/repositories/IStatusRepository";
import {Status} from "../../domain/status";
import {ICreateStatusUseCase} from "./ICreateStatusUseCase";
import {ILogger} from "@coreShared/logs/ILogger";
import {Result} from "@coreShared/types/Result";
import {CreateStatusDTO, CreateStatusResponseDTO} from "@status/adapters/dtos/CreateStatusDTO";
import {UseCaseError} from "@coreShared/errors/useCaseError";
import {IStatusDomainService} from "@status/domain/service/IStatusDomainService";
import {LoggerMessages} from "@coreShared/messages/loggerMessages";
import {StatusMessages} from "@coreShared/messages/statusMessages";
import {ErrorMessages} from "@coreShared/messages/errorMessages";

@injectable()
export class CreateStatusUseCase implements ICreateStatusUseCase {
    private readonly className: string = 'CreateStatusUseCase';

    constructor(
        @inject("IStatusRepository") private readonly statusRepository: IStatusRepository,
        @inject("ILogger") private readonly logger: ILogger,
        @inject("IStatusDomainService") private readonly statusDomainService: IStatusDomainService,
    ) {
    }

    public async execute(input: CreateStatusDTO): Promise<Result<CreateStatusResponseDTO, UseCaseError>> {
        const method = "execute";
        this.logger.logInfo(this.className, method, LoggerMessages.Info.START_EXECUTION);
        const transaction = await this.statusRepository.startTransaction();

        try {
            const newStatus: Status = await Status.create(input.description, this.statusDomainService);
            const savedStatus: Status= (await this.statusRepository.create(newStatus)).unwrapOrThrow();

            await transaction.commit();

            const successMessage: string = StatusMessages.Success.Creation(savedStatus.getDescription());
            this.logger.logInfo(this.className, method, successMessage);

            return Result.success<CreateStatusResponseDTO>({
                message: successMessage,
                id: savedStatus.getId()!.toString(),
                description: savedStatus.getDescription(),
            });

        } catch (e) {
            await transaction.rollback();
            const message: string = e instanceof Error ? e.message : ErrorMessages.Internal.INTERNAL_ERROR;
            const error = new UseCaseError(this.className, message);
            this.logger.logError(this.className, method, error);
            return Result.failure(error)
        }
    };
}
