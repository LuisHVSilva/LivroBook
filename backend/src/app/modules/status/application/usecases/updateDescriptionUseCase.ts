import "reflect-metadata";
import {inject, injectable} from "tsyringe";
import {IStatusRepository} from "@status/application/ports/IStatusRepository";
import {ILogger} from "@coreShared/logs/ILogger";
import {IUpdateDescriptionUseCase} from "@status/application/ports/IUpdateDescriptionUseCase";
import {Messages} from "@coreShared/constants/messages";
import {StringUtils} from "@coreShared/utils/StringUtils";
import {Status} from "@status/domain/status";
import {IStatusValidator} from "@status/domain/validators/IStatusValidator";
import {Result} from "@coreShared/types/Result";
import {UpdateDescriptionDTO, UpdateDescriptionResponseDTO} from "@status/adapters/dtos/UpdateDescriptionDTO";
import {UseCaseError} from "@coreShared/errors/UseCaseError";

@injectable()
export class UpdateDescriptionUseCase implements IUpdateDescriptionUseCase {
    private readonly className: string = "UpdateDescriptionUseCase";

    constructor(
        @inject("IStatusRepository") private readonly statusRepository: IStatusRepository,
        @inject("IStatusValidator") private readonly statusValidator: IStatusValidator,
        @inject("ILogger") private readonly logger: ILogger,
    ) {
    }

    public async execute(input: UpdateDescriptionDTO): Promise<Result<UpdateDescriptionResponseDTO>> {
        const method: string = 'execute';
        const transaction = await this.statusRepository.startTransaction();
        const id: string = input.id;
        try {
            this.logger.logInfo(this.className, method, Messages.Logger.Info.START_EXECUTION);

            const numberId: number = StringUtils.strToNumber(id, Messages.Status.Error.INVALID_ID(id))
            const formattedDescription: string = StringUtils.transformCapitalLetterWithoutAccent(input.newDescription);
            const existingStatus: Result<Status> = await this.statusRepository.findById(numberId);

            await this.statusValidator.validateExistingStatus(numberId);
            await this.statusValidator.validateUniqueDescription(formattedDescription);

            const status: Status = Status.restore({
                    id: existingStatus.getValue().getId()!,
                    description: formattedDescription,
                    active: existingStatus.getValue().getActive()
                }
            );

            await this.statusRepository.updateDescription(status);
            await transaction.commit();

            const successMessage: string = Messages.Status.Success
                .UPDATED_TO(existingStatus.getValue().getDescription(), formattedDescription);

            this.logger.logInfo(this.className, method, successMessage);

            return Result.success<UpdateDescriptionResponseDTO>({
                message: successMessage,
                newDescription: formattedDescription
            });
        } catch (error) {
            await transaction.rollback();
            this.logger.logError(this.className, method, error as Error);

            const message: string = error instanceof Error ? error.message : Messages.Status.Error.UPDATED_FAILED;
            throw new UseCaseError(this.className, message);
        }
    };
}