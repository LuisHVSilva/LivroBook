import {inject, injectable} from "tsyringe";
import {IUpdateStatusUseCase} from "./IUpdateStatus.useCase";
import {LogExecution} from "@coreShared/decorators/LogExecution";
import {Transactional} from "@coreShared/decorators/Transactional";
import {UpdateStatusDTO, UpdateStatusResponseDTO} from "@status/adapters/dtos/status.dto";
import {ResultType} from "@coreShared/types/result.type";
import {Transaction} from "sequelize";
import {UseCaseResponseUtil} from "@coreShared/utils/useCaseResponse.util";
import {IStatusService} from "@status/domain/services/interfaces/IStatus.service";
import {UpdateResultType} from "@coreShared/types/crudResult.type";
import {ErrorMessages} from "@coreShared/messages/errorMessages";

@injectable()
export class UpdateStatusUseCase implements IUpdateStatusUseCase {
    constructor(
        @inject("IStatusService") private readonly statusService: IStatusService,
    ) {
    }

    @LogExecution()
    @Transactional()
    async execute(input: UpdateStatusDTO, transaction?: Transaction): Promise<ResultType<UpdateResultType<UpdateStatusResponseDTO>>> {
        if (!transaction) {
            return ResultType.failure(new Error(ErrorMessages.failure.transactionCreation));
        }

        try {
            const updatedStatus: UpdateResultType<UpdateStatusResponseDTO> = await this.statusService.update(input, transaction);

            return ResultType.success(updatedStatus);
        } catch (error) {
            return UseCaseResponseUtil.handleResultError(error);
        }
    }
}