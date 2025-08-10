import {inject, injectable} from "tsyringe";
import {ICreateDocumentTypeUseCase} from "@document/useCases/createDocumentType/ICreateDocumentType.useCase";
import {IDocumentTypeService} from "@document/domain/services/interfaces/IDocumentType.service";
import {LogExecution} from "@coreShared/decorators/LogExecution";
import {Transaction} from "sequelize";
import {CreateDocumentTypeDTO, CreateDocumentTypeResponseDTO} from "@document/adapters/dto/documentType.dto";
import {ResultType} from "@coreShared/types/result.type";
import {UseCaseResponseUtil} from "@coreShared/utils/useCaseResponse.util";
import {Transactional} from "@coreShared/decorators/Transactional";
import {DocumentTypeEntity} from "@document/domain/entities/documentType.entity";
import {CreateResultType} from "@coreShared/types/crudResult.type";

@injectable()
export class CreateDocumentTypeUseCase implements ICreateDocumentTypeUseCase {
    constructor(
        @inject("IDocumentTypeService") private readonly documentTypeService: IDocumentTypeService
    ) {
    }

    @LogExecution()
    @Transactional()
    async execute(input: CreateDocumentTypeDTO, transaction?: Transaction): Promise<ResultType<CreateDocumentTypeResponseDTO>> {
        try {
            const created: CreateResultType<DocumentTypeEntity> = await this.documentTypeService.create(input, transaction!);

            return ResultType.success({
                id: created.entity.id!,
                description: created.entity.description,
                countryId: created.entity.countryId,
                statusId: created.entity.statusId
            })

        } catch (error) {
            return UseCaseResponseUtil.handleResultError(error);
        }
    }
}