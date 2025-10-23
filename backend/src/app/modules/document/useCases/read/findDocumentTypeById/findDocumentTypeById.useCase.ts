import {IFindDocumentTypeByIdUseCase} from "@document/useCases/read/findDocumentTypeById/IFindDocumentTypeById.useCase";
import {inject, injectable} from "tsyringe";
import {IDocumentTypeService} from "@document/domain/services/interfaces/IDocumentType.service";
import {FindByIdRequestDTO} from "@coreShared/dtos/operation.dto";
import {ResultType} from "@coreShared/types/result.type";
import {FindByIdDocumentTypeResponseDTO} from "@document/adapters/dto/documentType.dto";
import {StringUtil} from "@coreShared/utils/string.util";
import {DocumentTypeEntity} from "@document/domain/entities/documentType.entity";
import {UseCaseResponseError} from "@coreShared/errors/useCaseResponse.error";
import {LogError} from "@coreShared/decorators/LogError";

@injectable()
export class FindDocumentTypeByIdUseCase implements IFindDocumentTypeByIdUseCase {
    constructor(
        @inject("IDocumentTypeService") private readonly service: IDocumentTypeService
    ) {
    }

    @LogError()
    async execute(input: FindByIdRequestDTO): Promise<ResultType<FindByIdDocumentTypeResponseDTO>> {
        try {
            const id: number = StringUtil.strToNumber(input.id);
            const entity: DocumentTypeEntity = await this.service.getById(id);

            return ResultType.success(entity);
        } catch (error) {
            return UseCaseResponseError.handleResultError(error);
        }
    }
}