import {inject, injectable} from "tsyringe";
import {IDeleteDocumentTypesUseCase} from "@document/useCases/deleteDocumentTypes/IDeleteDocumentTypes.useCase";
import {IDocumentTypeService} from "@document/domain/services/interfaces/IDocumentType.service";
import {Transaction} from "sequelize";
import {LogExecution} from "@coreShared/decorators/LogExecution";
import {DeleteDocumentTypesDTO, DeleteDocumentTypesResponseDTO} from "@document/adapters/dto/documentType.dto";
import {ResultType} from "@coreShared/types/result.type";
import {ErrorMessages} from "@coreShared/messages/errorMessages";
import {UseCaseResponseUtil} from "@coreShared/utils/useCaseResponse.util";
import {StringUtil} from "@coreShared/utils/string.util";
import {DomainError} from "@coreShared/errors/domain.error";
import {EntitiesMessage} from "@coreShared/messages/entities.message";
import {Transactional} from "@coreShared/decorators/Transactional";
import {DocumentTypeEntity} from "@document/domain/entities/documentType.entity";

@injectable()
export class DeleteDocumentTypesUseCase implements IDeleteDocumentTypesUseCase {
    constructor(
        @inject("IDocumentTypeService") private readonly documentTypeService: IDocumentTypeService
    ) {
    }

    @LogExecution()
    @Transactional()
    async execute(input: DeleteDocumentTypesDTO, transaction?: Transaction): Promise<ResultType<DeleteDocumentTypesResponseDTO>> {
        if (!transaction) return ResultType.failure(new Error(ErrorMessages.failure.transactionCreation));

        try {
            const ids: number[] | undefined = StringUtil.parseCsvFilter(input.ids, Number);
            if (!ids) return ResultType.failure(new DomainError(EntitiesMessage.error.validation.idRequired));

            for (const id of ids) {
                await this.documentTypeService.delete(id, transaction);
            }

            return ResultType.success({
                message: EntitiesMessage.success.delete(DocumentTypeEntity.ENTITY_NAME)
            });
        } catch (error) {
            return UseCaseResponseUtil.handleResultError(error);
        }
    }
}