import {inject, injectable} from "tsyringe";
import {IDeletePhoneTypesUseCase} from "@phone/useCase/deletePhoneTypes/IDeletePhoneTypes.useCase";
import {IPhoneTypeService} from "@phone/domain/service/interfaces/IPhoneType.service";
import {LogExecution} from "@coreShared/decorators/LogExecution";
import {Transactional} from "@coreShared/decorators/Transactional";
import {ResultType} from "@coreShared/types/result.type";
import {Transaction} from "sequelize";
import {ErrorMessages} from "@coreShared/messages/errorMessages";
import {UseCaseResponseUtil} from "@coreShared/utils/useCaseResponse.util";
import {StringUtil} from "@coreShared/utils/string.util";
import {DomainError} from "@coreShared/errors/domain.error";
import {EntitiesMessage} from "@coreShared/messages/entities.message";
import {DeleteRequestDTO, DeleteResponseDTO} from "@coreShared/dtos/operation.dto";
import {DeleteReport} from "@coreShared/utils/operationReport.util";

@injectable()
export class DeletePhoneTypesUseCase implements IDeletePhoneTypesUseCase {
    constructor(
        @inject("IPhoneTypeService") private readonly service: IPhoneTypeService
    ) {
    }

    @LogExecution()
    @Transactional()
    async execute(input: DeleteRequestDTO, transaction?: Transaction): Promise<ResultType<DeleteResponseDTO>> {
        if (!transaction) {
            return ResultType.failure(new Error(ErrorMessages.failure.transactionCreation));
        }

        try {
            const ids: number[] | undefined = StringUtil.parseCsvFilter(input.id, Number);
            if (!ids) return ResultType.failure(new DomainError(EntitiesMessage.error.validation.idRequired));

            const report: DeleteReport = await this.service.deleteMany(ids, transaction);

            return ResultType.success({
                report
            });
        } catch (error) {
            return UseCaseResponseUtil.handleResultError(error);
        }
    }
}