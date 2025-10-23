import {inject, injectable} from "tsyringe";
import {IUpdateDocumentTypeUseCase} from "@document/useCases/update/updateDocumentType/IUpdateDocumentType.useCase";
import {IDocumentTypeService} from "@document/domain/services/interfaces/IDocumentType.service";
import {Transactional} from "@coreShared/decorators/Transactional";
import {UpdateDocumentTypeDTO, UpdateDocumentTypeResponseDTO} from "@document/adapters/dto/documentType.dto";
import {Transaction} from "sequelize";
import {ResultType} from "@coreShared/types/result.type";
import {UseCaseResponseError} from "@coreShared/errors/useCaseResponse.error";
import {UpdateResultType} from "@coreShared/types/crudResult.type";
import {ErrorMessages} from "@coreShared/messages/errorMessages";
import {LogError} from "@coreShared/decorators/LogError";

@injectable()
export class UpdateDocumentTypeUseCase implements IUpdateDocumentTypeUseCase {
    constructor(
        @inject("IDocumentTypeService") private readonly documentTypeService: IDocumentTypeService
    ) {
    }

    @LogError()
    @Transactional()
    async execute(input: UpdateDocumentTypeDTO, transaction?: Transaction): Promise<ResultType<UpdateResultType<UpdateDocumentTypeResponseDTO>>> {
        if (!transaction) {
            return ResultType.failure(new Error(ErrorMessages.failure.transactionCreation));
        }

        try {
            const updatedEntity: UpdateResultType<UpdateDocumentTypeResponseDTO> = await this.documentTypeService.update(input, transaction);

            return ResultType.success(updatedEntity);
        } catch (error) {
            return UseCaseResponseError.handleResultError(error);
        }
    }
}