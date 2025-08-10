import {inject, injectable} from "tsyringe";
import {IFindDocumentTypesUseCase} from "@document/useCases/findDocumentTypes/IFindDocumentTypes.useCase";
import {IDocumentTypeService} from "@document/domain/services/interfaces/IDocumentType.service";
import {LogExecution} from "@coreShared/decorators/LogExecution";
import {
    DocumentTypeFilterDTO,
    FindDocumentTypesDTO,
    FindDocumentTypesResponseDTO
} from "@document/adapters/dto/documentType.dto";
import {UseCaseResponseUtil} from "@coreShared/utils/useCaseResponse.util";
import {StringUtil} from "@coreShared/utils/string.util";
import {ResultType} from "@coreShared/types/result.type";
import {FindAllType} from "@coreShared/types/findAll.type";
import {DocumentTypeEntity} from "@document/domain/entities/documentType.entity";

@injectable()
export class FindDocumentTypesUseCase implements IFindDocumentTypesUseCase {
    constructor(
        @inject("IDocumentTypeService") private readonly documentTypeService: IDocumentTypeService,
    ) {
    }

    @LogExecution()
    async execute(input: FindDocumentTypesDTO): Promise<ResultType<FindDocumentTypesResponseDTO>> {
        try {
            const filter: DocumentTypeFilterDTO = this.mapLocationFilter(input);
            const page: number = input.page ? StringUtil.strToNumber(input.page) : 1;
            const limit: number = input.limit ? StringUtil.strToNumber(input.limit) : 20;

            const {entities, total}: FindAllType<DocumentTypeEntity> = await this.documentTypeService.getAll(filter, page, limit);

            return ResultType.success({
                page,
                limit,
                totalPages: Math.ceil(total / limit),
                data: entities
            });

        } catch (error) {
            return UseCaseResponseUtil.handleResultError(error);
        }
    }

    private mapLocationFilter(input: FindDocumentTypesDTO): DocumentTypeFilterDTO {
        return {
            description: StringUtil.parseCsvFilter(input.descriptions?.toString(), String),
            countryId: StringUtil.parseCsvFilter(input.countiesIds?.toString(), Number),
            statusId: StringUtil.parseCsvFilter(input.statusesIds?.toString(), Number),
        };
    }
}