import {inject, injectable} from "tsyringe";
import {IUpdateDocumentTypeUseCase} from "@document/useCases/updateDocumentType/IUpdateDocumentType.useCase";
import {IDocumentTypeService} from "@document/domain/services/interfaces/IDocumentType.service";
import {LogExecution} from "@coreShared/decorators/LogExecution";
import {Transactional} from "@coreShared/decorators/Transactional";
import {UpdateDocumentTypeDTO} from "@document/adapters/dto/documentType.dto";
import {Transaction} from "sequelize";
import {ResultType} from "@coreShared/types/result.type";
import {UseCaseResponseUtil} from "@coreShared/utils/useCaseResponse.util";
import {DocumentTypeEntity} from "@document/domain/entities/documentType.entity";
import {UpdateResultType} from "@coreShared/types/crudResult.type";
import {ErrorMessages} from "@coreShared/messages/errorMessages";

@injectable()
export class UpdateDocumentTypeUseCase implements IUpdateDocumentTypeUseCase {
    constructor(
        @inject("IDocumentTypeService") private readonly documentTypeService: IDocumentTypeService
    ) {
    }

    @LogExecution()
    @Transactional()
    async execute(input: UpdateDocumentTypeDTO, transaction?: Transaction): Promise<ResultType<UpdateResultType<DocumentTypeEntity>>> {
        if (!transaction) {
            return ResultType.failure(new Error(ErrorMessages.failure.transactionCreation));
        }

        try {
            const updatedEntity: UpdateResultType<DocumentTypeEntity> = await this.documentTypeService.update(input, transaction);

            return ResultType.success(updatedEntity);
        } catch (error) {
            return UseCaseResponseUtil.handleResultError(error);
        }
    }
}