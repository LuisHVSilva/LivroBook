import {IUseCase} from "../../../../../core/shared/interfaces/usecases";
import {IStatusRepository} from "../ports/IStatusRepository";
import {Status} from "../../domain/status";
import {Messages} from "../../../../../core/shared/constants/messages";
import {ILogger} from "../../../../../core/shared/logs/ILogger";
import {inject, injectable} from "tsyringe";

export type CreateStatusInput = {
    description: string;
};

export type CreateStatusOutput = {
    description: string;
};

export class StatusCreationError extends Error {
    constructor(message: string) {
        super(message);
        this.name = 'StatusCreationError';
    }
}

@injectable()
export class CreateStatusUseCase implements IUseCase<CreateStatusInput, CreateStatusOutput> {
    private readonly method: string = 'CreateStatusUseCase';

    constructor(
        @inject("IStatusRepository") private readonly statusRepository: IStatusRepository,
        @inject("ILogger") private readonly logger: ILogger,
    ) {
    }

    public async execute(input: CreateStatusInput): Promise<CreateStatusOutput> {
        try {
            const status = Status.create(input.description);
            const savedStatus = await this.statusRepository.save(status);

            return {
                description: savedStatus.getDescription(),
            };
        } catch (error) {
            this.logger.logError(this.method, error as Error, undefined, input);
            throw new StatusCreationError(Messages.Status.Error.CREATED_FAILED); // Lançar erro customizado
        }
    }
}
