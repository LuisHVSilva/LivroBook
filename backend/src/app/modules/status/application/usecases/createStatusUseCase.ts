import "reflect-metadata";
import {inject, injectable} from "tsyringe";
import {IStatusRepository} from "../ports/IStatusRepository";
import {Status} from "../../domain/status";
import {ICreateStatusUseCase, CreateStatusInput, CreateStatusOutput} from "../ports/ICreateStatusUseCase";
import {IStatusValidator} from "../../domain/validators/IStatusValidator";
import {Messages} from "@coreShared/constants/messages";
import {ILogger} from "@coreShared/logs/ILogger";
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

    public async execute(input: CreateStatusInput): Promise<CreateStatusOutput> {
        const method = "execute";
        try {
            this.logger.logInfo(this.className, method, Messages.Logger.Info.START_EXECUTION);

            await this.statusValidator.validateUniqueDescription(input.description);

            const status = Status.create(input.description);
            const savedStatus = await this.statusRepository.save(status);

            return {
                id: savedStatus.getId(),
                description: savedStatus.getDescription(),
            };
        } catch (error) {

            if (error instanceof Error) {
                this.logger.logError(this.className, method, error);
                throw new UseCaseError(this.className, error.message);
            }

            throw new UseCaseError(this.className, Messages.Status.Error.CREATION_FAILED);
        }
    };
}
