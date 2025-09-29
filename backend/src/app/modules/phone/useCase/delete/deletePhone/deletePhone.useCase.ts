import {inject, injectable} from "tsyringe";
import {IDeletePhoneUseCase} from "@phone/useCase/delete/deletePhone/IDeletePhone.useCase";
import {IPhoneService} from "@phone/domain/service/interfaces/IPhone.service";
import {LogExecution} from "@coreShared/decorators/LogExecution";
import {Transactional} from "@coreShared/decorators/Transactional";
import {ResultType} from "@coreShared/types/result.type";
import {Transaction} from "sequelize";
import {ErrorMessages} from "@coreShared/messages/errorMessages";
import {UseCaseResponseUtil} from "@coreShared/utils/useCaseResponse.util";
import {StringUtil} from "@coreShared/utils/string.util";
import {DomainError} from "@coreShared/errors/domain.error";
import {EntitiesMessage} from "@coreShared/messages/entities.message";
import {DeleteReport} from "@coreShared/utils/operationReport.util";
import {DeleteRequestDTO, DeleteResponseDTO} from "@coreShared/dtos/operation.dto";


@injectable()
export class DeletePhoneUseCase implements IDeletePhoneUseCase {
    constructor(
        @inject("IPhoneService") private readonly service: IPhoneService
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
            if (!ids) {
                return ResultType.failure(new DomainError(EntitiesMessage.error.validation.idRequired));
            }

            const report: DeleteReport = await this.service.deleteMany(ids, transaction);


            return ResultType.success({
                report
            });
        } catch (error) {
            return UseCaseResponseUtil.handleResultError(error);
        }
    }


}