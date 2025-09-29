import {IDeleteStatusUseCase} from "@status/useCases/delete/deleteStatus/IDeleteStatus.useCase";
import {inject, injectable} from "tsyringe";
import {LogExecution} from "@coreShared/decorators/LogExecution";
import {Transactional} from "@coreShared/decorators/Transactional";
import {Transaction} from "sequelize";
import {ResultType} from "@coreShared/types/result.type";
import {StringUtil} from "@coreShared/utils/string.util";
import {UseCaseResponseUtil} from "@coreShared/utils/useCaseResponse.util";
import {EntitiesMessage} from "@coreShared/messages/entities.message";
import {IStatusService} from "@status/domain/services/interfaces/IStatus.service";
import {DomainError} from "@coreShared/errors/domain.error";
import {ErrorMessages} from "@coreShared/messages/errorMessages";
import {DeleteReport} from "@coreShared/utils/operationReport.util";
import {DeleteRequestDTO, DeleteResponseDTO} from "@coreShared/dtos/operation.dto";

@injectable()
export class DeleteStatusUseCase implements IDeleteStatusUseCase {
    constructor(
        @inject("IStatusService") private readonly statusService: IStatusService,
    ) {
    }

    @LogExecution()
    @Transactional()
    async execute(input: DeleteRequestDTO, transaction?: Transaction): Promise<ResultType<DeleteResponseDTO>> {
        if (!transaction) {
            return ResultType.failure(new Error(ErrorMessages.failure.transactionCreation));
        }

        try {
            const ids: number[] | undefined = StringUtil.parseCsvFilter(input.id, Number)
            if (!ids) return ResultType.failure(new DomainError(EntitiesMessage.error.validation.idRequired))

            const report: DeleteReport = await this.statusService.deleteMany(ids, transaction!);

            return ResultType.success({
                report
            });
        } catch (error) {
            return UseCaseResponseUtil.handleResultError(error);
        }
    }
}