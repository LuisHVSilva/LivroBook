import {inject, injectable} from "tsyringe";
import {LogExecution} from "@coreShared/decorators/LogExecution";
import {UseCaseResponseUtil} from "@coreShared/utils/useCaseResponse.util";
import {StringUtil} from "@coreShared/utils/string.util";
import {ResultType} from "@coreShared/types/result.type";
import {FindAllType} from "@coreShared/types/findAll.type";
import {IFindUserCredentialTypesUseCase} from "@user/useCases/findUserCredentialTypes/IFindUserCredentialTypes.useCase";
import {IUserCredentialTypeService} from "@user/domain/services/interface/IUserCredentialType.service";
import {
    FindUserCredentialTypesRawDTO,
    FindUserCredentialTypesResponseDTO, UserCredentialTypeFilterDTO
} from "@user/adapters/dtos/userCredentialType.dto";
import {UserCredentialTypeEntity} from "@user/domain/entities/userCredentialType.entity";

@injectable()
export class FindUserCredentialTypesUseCase implements IFindUserCredentialTypesUseCase {
    constructor(
        @inject("IUserCredentialTypeService") private readonly service: IUserCredentialTypeService
    ) {
    }

    @LogExecution()
    async execute(input: FindUserCredentialTypesRawDTO): Promise<ResultType<FindUserCredentialTypesResponseDTO>> {
        try {
            const filter: UserCredentialTypeFilterDTO = this.mapLocationFilter(input);
            const page: number = input.page ? StringUtil.strToNumber(input.page) : 1;
            const limit: number = input.limit ? StringUtil.strToNumber(input.limit) : 20;

            const {entities, total}: FindAllType<UserCredentialTypeEntity> = await this.service.findMany(filter, page, limit);

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

    private mapLocationFilter(input: FindUserCredentialTypesRawDTO): UserCredentialTypeFilterDTO {
        return {
            description: StringUtil.parseCsvFilter(input.description?.toString(), String),
            statusId: StringUtil.parseCsvFilter(input.statusId?.toString(), Number),
        };
    }
}