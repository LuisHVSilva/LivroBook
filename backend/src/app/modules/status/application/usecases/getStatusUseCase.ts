import "reflect-metadata";
import {inject, injectable} from "tsyringe";
import {GetStatusInput, GetStatusOutput, IGetStatusUseCase} from "@status/application/ports/IGetStatusUseCase";
import {IStatusRepository} from "@status/application/ports/IStatusRepository";
import {ILogger} from "@coreShared/logs/ILogger";
import {Status} from "@status/domain/status";
import {UseCaseError} from "@coreShared/errors/UseCaseError";
import {Messages} from "@coreShared/constants/messages";

@injectable()
export class GetStatusUseCase implements IGetStatusUseCase {
    private readonly className: string = "GetStatusUseCase";

    constructor(
        @inject("IStatusRepository") private readonly statusRepository: IStatusRepository,
        @inject("ILogger") private readonly logger: ILogger,
    ) {
    }

    public async execute(input: GetStatusInput): Promise<GetStatusOutput | null> {
        const method = "execute";
        try {
            this.logger.logInfo(this.className, method, Messages.Logger.Info.START_EXECUTION);

            const status: Status | null = await this.statusRepository.findById(parseInt(input.id));

            if (!status) {
                return null;
            }

            return {
                id: status.getId()!,
                description: status.getDescription(),
                active: status.getActive(),
            };
        } catch (error) {
            const message = error instanceof Error ? error.message : Messages.Status.Error.NOT_FOUND;
            this.logger.logError(this.className, method, error as Error);
            throw new UseCaseError(this.className, message);
        }
    };
}