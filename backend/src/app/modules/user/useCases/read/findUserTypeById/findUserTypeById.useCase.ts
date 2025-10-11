import {inject, injectable} from "tsyringe";
import {FindByIdRequestDTO} from "@coreShared/dtos/operation.dto";
import {ResultType} from "@coreShared/types/result.type";
import {StringUtil} from "@coreShared/utils/string.util";
import {UseCaseResponseUtil} from "@coreShared/utils/useCaseResponse.util";
import {LogError} from "@coreShared/decorators/LogError";
import {FindByIdUserTypeResponseDTO} from "@user/adapters/dtos/userType.dto";
import {IFindUserTypeByIdUseCase} from "@user/useCases/read/findUserTypeById/IFindUserTypeById.useCase";
import {IUserTypeService} from "@user/domain/services/interface/IUserType.service";
import {UserTypeEntity} from "@user/domain/entities/userType.entity";

@injectable()
export class FindUserTypeByIdUseCase implements IFindUserTypeByIdUseCase {
    constructor(
        @inject("IUserTypeService")
        private readonly service: IUserTypeService,
    ) {
    }

    @LogError()
    async execute(input: FindByIdRequestDTO): Promise<ResultType<FindByIdUserTypeResponseDTO>> {
        try {
            const id: number = StringUtil.strToNumber(input.id);
            const entity: UserTypeEntity = await this.service.getById(id);

            return ResultType.success(entity);
        } catch (error) {
            return UseCaseResponseUtil.handleResultError(error);
        }
    }
}