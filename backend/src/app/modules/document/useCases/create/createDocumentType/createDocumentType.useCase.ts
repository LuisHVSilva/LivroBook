import {inject, injectable} from "tsyringe";
import {ICreateDocumentTypeUseCase} from "@document/useCases/create/createDocumentType/ICreateDocumentType.useCase";
import {IDocumentTypeService} from "@document/domain/services/interfaces/IDocumentType.service";
import {Transaction} from "sequelize";
import {CreateDocumentTypeDTO, CreateDocumentTypeResponseDTO} from "@document/adapters/dto/documentType.dto";
import {ResultType} from "@coreShared/types/result.type";
import {UseCaseResponseUtil} from "@coreShared/utils/useCaseResponse.util";
import {Transactional} from "@coreShared/decorators/Transactional";
import {DocumentTypeEntity} from "@document/domain/entities/documentType.entity";
import {ErrorMessages} from "@coreShared/messages/errorMessages";
import {LogError} from "@coreShared/decorators/LogError";

@injectable()
export class CreateDocumentTypeUseCase implements ICreateDocumentTypeUseCase {
    constructor(
        @inject("IDocumentTypeService")
        private readonly documentTypeService: IDocumentTypeService
    ) {
    }

    @LogError()
    @Transactional()
    async execute(input: CreateDocumentTypeDTO, transaction?: Transaction): Promise<ResultType<CreateDocumentTypeResponseDTO>> {
        if (!transaction) {
            return ResultType.failure(new Error(ErrorMessages.failure.transactionCreation));
        }

        try {
            const created: DocumentTypeEntity = await this.documentTypeService.create(input, transaction);
            return ResultType.success(created)
        } catch (error) {
            return UseCaseResponseUtil.handleResultError(error);
        }
    }
}