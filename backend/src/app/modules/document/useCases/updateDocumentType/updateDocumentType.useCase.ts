import {inject, injectable} from "tsyringe";
import {IUpdateDocumentTypeUseCase} from "@document/useCases/updateDocumentType/IUpdateDocumentType.useCase";
import {IDocumentTypeService} from "@document/domain/services/interfaces/IDocumentType.service";
import {LogExecution} from "@coreShared/decorators/LogExecution";
import {Transactional} from "@coreShared/decorators/Transactional";
import {UpdateDocumentTypeDTO, UpdateDocumentTypeResponseDTO} from "@document/adapters/dto/documentType.dto";
import {Transaction} from "sequelize";
import {ResultType} from "@coreShared/types/result.type";
import {UseCaseResponseUtil} from "@coreShared/utils/useCaseResponse.util";
import {DocumentTypeEntity} from "@document/domain/entities/documentType.entity";

@injectable()
export class UpdateDocumentTypeUseCase implements IUpdateDocumentTypeUseCase {
    constructor(
        @inject("IDocumentTypeService") private readonly documentTypeService: IDocumentTypeService
    ) {
    }

    @LogExecution()
    @Transactional()
    async execute(input: UpdateDocumentTypeDTO, transaction?: Transaction): Promise<ResultType<UpdateDocumentTypeResponseDTO>> {
        try {
            const updatedEntity: DocumentTypeEntity = await this.documentTypeService.update(input, transaction!);

            return ResultType.success({
                id: updatedEntity.id!,
                description: updatedEntity.description,
                countryId: updatedEntity.countryId,
                statusId: updatedEntity.statusId,
            });
        } catch (error) {
            return UseCaseResponseUtil.handleResultError(error);
        }
    }
}