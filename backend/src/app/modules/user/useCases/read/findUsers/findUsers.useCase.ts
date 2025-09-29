import {inject, injectable} from "tsyringe";
import {LogExecution} from "@coreShared/decorators/LogExecution";
import {UseCaseResponseUtil} from "@coreShared/utils/useCaseResponse.util";
import {StringUtil} from "@coreShared/utils/string.util";
import {ResultType} from "@coreShared/types/result.type";
import {FindAllType} from "@coreShared/types/findAll.type";
import {UserTypeFilterDTO} from "@user/adapters/dtos/userType.dto";
import {IFindUsersUseCase} from "@user/useCases/read/findUsers/IFindUsers.useCase";
import {IUserService} from "@user/domain/services/interface/IUser.service";
import {FindUsersRawDTO, FindUsersResponseDTO, UserFilterDTO} from "@user/adapters/dtos/user.dto";
import {UserEntity} from "@user/domain/entities/user.entity";

@injectable()
export class FindUsersUseCase implements IFindUsersUseCase {
    constructor(
        @inject("IUserService") private readonly service: IUserService,
    ) {
    }

    @LogExecution()
    async execute(input: FindUsersRawDTO): Promise<ResultType<FindUsersResponseDTO>> {
        try {
            const filter: UserTypeFilterDTO = this.mapLocationFilter(input);
            const page: number = input.page ? StringUtil.strToNumber(input.page) : 1;
            const limit: number = input.limit ? StringUtil.strToNumber(input.limit) : 20;

            const {entities, total}: FindAllType<UserEntity> = await this.service.findMany(filter, page, limit);

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

    private mapLocationFilter(input: FindUsersRawDTO): UserFilterDTO {
        return {
            id: StringUtil.parseCsvFilter(input.id, Number),
            name: StringUtil.parseCsvFilter(input.name, String),
            email: StringUtil.parseCsvFilter(input.email, String),
            document: StringUtil.parseCsvFilter(input.document, String),
            birthday: StringUtil.parseCsvFilter(input.birthday, StringUtil.parseDate),
            userTypeId: StringUtil.parseCsvFilter(input.userTypeId, Number),
            cityId: StringUtil.parseCsvFilter(input.cityId, Number),
            userCredentialId: StringUtil.parseCsvFilter(input.userCredentialId, Number),
            documentTypeId: StringUtil.parseCsvFilter(input.documentTypeId, Number),
            phoneId: StringUtil.parseCsvFilter(input.phoneId, Number),
            statusId: StringUtil.parseCsvFilter(input.statusId, Number),
        };
    }
}