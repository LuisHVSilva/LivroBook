import {inject, injectable} from "tsyringe";
import {LogExecution} from "@coreShared/decorators/LogExecution";
import {UseCaseResponseError} from "@coreShared/errors/useCaseResponse.error";
import {StringUtil} from "@coreShared/utils/string.util";
import {ResultType} from "@coreShared/types/result.type";
import {FindAllType} from "@coreShared/types/findAll.type";
import {IFindUserTypesUseCase} from "@user/useCases/read/findUserTypes/IFindUserTypes.useCase";
import {IUserTypeService} from "@user/domain/services/interface/IUserType.service";
import {FindUserTypesRawDTO, FindUserTypesResponseDTO, UserTypeFilterDTO} from "@user/adapters/dtos/userType.dto";
import {UserTypeEntity} from "@user/domain/entities/userType.entity";

@injectable()
export class FindUserTypesUseCase implements IFindUserTypesUseCase {
    constructor(
        @inject("IUserTypeService")
        private readonly service: IUserTypeService,
    ) {
    }

    @LogExecution()
    async execute(input: FindUserTypesRawDTO): Promise<ResultType<FindUserTypesResponseDTO>> {
        try {
            const filter: UserTypeFilterDTO = this.mapLocationFilter(input);
            const page: number = input.page ? StringUtil.strToNumber(input.page) : 1;
            const limit: number = input.limit ? StringUtil.strToNumber(input.limit) : 20;

            const {entities, total}: FindAllType<UserTypeEntity> = await this.service.findMany(filter, page, limit);

            return ResultType.success({
                page,
                limit,
                totalPages: Math.ceil(total / limit),
                data: entities
            });

        } catch (error) {
            return UseCaseResponseError.handleResultError(error);
        }
    }

    private mapLocationFilter(input: FindUserTypesRawDTO): UserTypeFilterDTO {
        return {
            id: StringUtil.parseCsvFilter(input.id?.toString(), Number),
            description: StringUtil.parseCsvFilter(input.description?.toString(), String),
            status: StringUtil.parseCsvFilter(input.status?.toString(), String),
        };
    }
}