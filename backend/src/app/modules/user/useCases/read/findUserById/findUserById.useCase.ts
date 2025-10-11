import {inject, injectable} from "tsyringe";
import {FindByIdRequestDTO} from "@coreShared/dtos/operation.dto";
import {ResultType} from "@coreShared/types/result.type";
import {StringUtil} from "@coreShared/utils/string.util";
import {UseCaseResponseUtil} from "@coreShared/utils/useCaseResponse.util";
import {LogError} from "@coreShared/decorators/LogError";
import {IFindUserByIdUseCase} from "@user/useCases/read/findUserById/IFindUserById.useCase";
import {FindByIdUserResponseDTO} from "@user/adapters/dtos/user.dto";
import {IUserService} from "@user/domain/services/interface/IUser.service";
import {UserEntity} from "@user/domain/entities/user.entity";

@injectable()
export class FindUserByIdUseCase implements IFindUserByIdUseCase {
    constructor(
        @inject("IUserService")
        private readonly service: IUserService,
    ) {
    }

    @LogError()
    async execute(input: FindByIdRequestDTO): Promise<ResultType<FindByIdUserResponseDTO>> {
        try {
            const id: number = StringUtil.strToNumber(input.id);
            const entity: UserEntity = await this.service.getById(id);

            return ResultType.success(entity);
        } catch (error) {
            return UseCaseResponseUtil.handleResultError(error);
        }
    }
}