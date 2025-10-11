import {inject, injectable} from "tsyringe";
import {FindByIdRequestDTO} from "@coreShared/dtos/operation.dto";
import {ResultType} from "@coreShared/types/result.type";
import {StringUtil} from "@coreShared/utils/string.util";
import {UseCaseResponseUtil} from "@coreShared/utils/useCaseResponse.util";
import {LogError} from "@coreShared/decorators/LogError";
import {
    IFindUserCredentialTypeByIdUseCase
} from "@user/useCases/read/findUserCredentialTypeById/IFindUserCredentialTypeById.useCase";
import {FindByIdUserCredentialTypeResponseDTO} from "@user/adapters/dtos/userCredentialType.dto";
import {IUserCredentialTypeService} from "@user/domain/services/interface/IUserCredentialType.service";
import {UserCredentialTypeEntity} from "@user/domain/entities/userCredentialType.entity";

@injectable()
export class FindUserCredentialTypeByIdUseCase implements IFindUserCredentialTypeByIdUseCase {
    constructor(
        @inject("IUserCredentialTypeService")
        private readonly service: IUserCredentialTypeService,
    ) {
    }

    @LogError()
    async execute(input: FindByIdRequestDTO): Promise<ResultType<FindByIdUserCredentialTypeResponseDTO>> {
        try {
            const id: number = StringUtil.strToNumber(input.id);
            const entity: UserCredentialTypeEntity = await this.service.getById(id);

            return ResultType.success(entity);
        } catch (error) {
            return UseCaseResponseUtil.handleResultError(error);
        }
    }
}