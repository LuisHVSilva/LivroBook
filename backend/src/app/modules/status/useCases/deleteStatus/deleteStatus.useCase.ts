import {IDeleteStatusUseCase} from "@status/useCases/deleteStatus/IDeleteStatus.useCase";
import {inject, injectable} from "tsyringe";
import {LogExecution} from "@coreShared/decorators/LogExecution";
import {Transactional} from "@coreShared/decorators/Transactional";
import {DeleteStatusDTO, DeleteStatusResponseDTO} from "@status/adapters/dtos/status.dto";
import {Transaction} from "sequelize";
import {ResultType} from "@coreShared/types/result.type";
import {StringUtil} from "@coreShared/utils/string.util";
import {UseCaseResponseUtil} from "@coreShared/utils/useCaseResponse.util";
import {EntitiesMessage} from "@coreShared/messages/entities.message";
import {IStatusService} from "@status/domain/services/interfaces/IStatus.service";
import {DomainError} from "@coreShared/errors/domain.error";

@injectable()
export class DeleteStatusUseCase implements IDeleteStatusUseCase {
    constructor(
        @inject("IStatusService") private readonly statusService: IStatusService,
    ) {
    }

    @LogExecution()
    @Transactional()
    async execute(input: DeleteStatusDTO, transaction?: Transaction): Promise<ResultType<DeleteStatusResponseDTO>> {
        try {
            const ids: number[] | undefined = StringUtil.parseCsvFilter(input.id.toString(), Number)

            if (!ids) {
                return ResultType.failure(new DomainError(EntitiesMessage.error.validation.idRequired))
            }

            await this.statusService.delete(ids, transaction!);

            return ResultType.success({
                message: EntitiesMessage.success.delete(input.id.toString()),
            });
        } catch (error) {
            return UseCaseResponseUtil.handleResultError(error);
        }
    }
}