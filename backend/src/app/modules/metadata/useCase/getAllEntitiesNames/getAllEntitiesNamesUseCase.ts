import {inject, injectable} from "tsyringe";
import {IGetAllEntitiesNamesUseCase} from "@modules/metadata/useCase/getAllEntitiesNames/IGetAllEntitiesNames.useCase";
import {IMetadataService} from "@modules/metadata/domain/services/interfaces/IMetadata.service";
import {ResultType} from "@coreShared/types/result.type";
import {UseCaseResponseUtil} from "@coreShared/utils/useCaseResponse.util";
import {EntitiesNamesEnum} from "@coreShared/enums/entitiesNamesEnum";
import {GetAllEntitiesNamesDTO} from "@modules/metadata/adapters/dtos/metadata.dto";
import {LogError} from "@coreShared/decorators/LogError";

@injectable()
export class GetAllEntitiesNamesUseCase implements IGetAllEntitiesNamesUseCase {
    constructor(
        @inject("IMetadataService") private service: IMetadataService,
    ) {
    }

    @LogError()
    async execute(): Promise<ResultType<GetAllEntitiesNamesDTO>> {
        try {
            const entitiesNames: EntitiesNamesEnum[] = this.service.getAllEntitiesNames();
            return ResultType.success(entitiesNames);
        } catch (error) {
            return UseCaseResponseUtil.handleResultError(error);
        }
    }
}