import {inject, injectable} from "tsyringe";
import {Transaction} from "sequelize";
import {LogExecution} from "@coreShared/decorators/LogExecution";
import {ResultType} from "@coreShared/types/result.type";
import {ErrorMessages} from "@coreShared/messages/errorMessages";
import {UseCaseResponseUtil} from "@coreShared/utils/useCaseResponse.util";
import {StringUtil} from "@coreShared/utils/string.util";
import {DomainError} from "@coreShared/errors/domain.error";
import {EntitiesMessage} from "@coreShared/messages/entities.message";
import {Transactional} from "@coreShared/decorators/Transactional";
import {DeleteRequestDTO, DeleteResponseDTO} from "@coreShared/dtos/operation.dto";
import {DeleteReport} from "@coreShared/utils/operationReport.util";
import {IDeleteCountryUseCase} from "@location/useCases/deleteCountry/IDeleteCountry.useCase";
import {ICountryService} from "@location/domain/services/interfaces/ICountry.service";

@injectable()
export class DeleteCountryUseCase implements IDeleteCountryUseCase {
    constructor(
        @inject("ICountryService") private readonly service: ICountryService,
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

            const report: DeleteReport = await this.service.deleteMany(ids, transaction!);

            return ResultType.success({
                report
            });
        } catch (error) {
            return UseCaseResponseUtil.handleResultError(error);
        }
    }
}