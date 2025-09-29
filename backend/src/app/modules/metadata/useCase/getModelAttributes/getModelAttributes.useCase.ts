import {inject, injectable} from "tsyringe";
import {IGetModelAttributesUseCase} from "@modules/metadata/useCase/getModelAttributes/IGetModelAttributes.useCase";
import {IMetadataService} from "@modules/metadata/domain/services/interfaces/IMetadata.service";
import {LogExecution} from "@coreShared/decorators/LogExecution";
import {ModelAttributeRequestDto} from "@modules/metadata/adapters/dtos/metadata.dto";
import {ResultType} from "@coreShared/types/result.type";
import {SimplifiedMetadataAttribute} from "@coreShared/types/metadata.type";
import {UseCaseResponseUtil} from "@coreShared/utils/useCaseResponse.util";
import {EntitiesNamesEnum} from "@coreShared/enums/entitiesNamesEnum";

@injectable()
export class GetModelAttributesUseCase implements IGetModelAttributesUseCase {
    constructor(
        @inject("IMetadataService") private metadataService: IMetadataService
    ) {
    }

    @LogExecution()
    async execute(input: ModelAttributeRequestDto): Promise<ResultType<SimplifiedMetadataAttribute[]>> {
        try {
            const entity = input.entityName as EntitiesNamesEnum;
            const modelAttributes: SimplifiedMetadataAttribute[] = await this.metadataService.getModelAttributes(entity);

            return ResultType.success(modelAttributes);
        } catch (error) {
            return UseCaseResponseUtil.handleResultError(error);
        }
    }
}
