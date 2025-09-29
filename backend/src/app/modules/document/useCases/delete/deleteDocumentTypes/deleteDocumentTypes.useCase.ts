import {inject, injectable} from "tsyringe";
import {IDeleteDocumentTypesUseCase} from "@document/useCases/delete/deleteDocumentTypes/IDeleteDocumentTypes.useCase";
import {IDocumentTypeService} from "@document/domain/services/interfaces/IDocumentType.service";
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

@injectable()
export class DeleteDocumentTypesUseCase implements IDeleteDocumentTypesUseCase {
    constructor(
        @inject("IDocumentTypeService") private readonly documentTypeService: IDocumentTypeService
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

            const report: DeleteReport = await this.documentTypeService.deleteMany(ids, transaction!);

            return ResultType.success({
                report
            });
        } catch (error) {
            return UseCaseResponseUtil.handleResultError(error);
        }
    }
}