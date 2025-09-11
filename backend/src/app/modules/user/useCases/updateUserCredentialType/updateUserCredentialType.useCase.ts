import {inject, injectable} from "tsyringe";
import {LogExecution} from "@coreShared/decorators/LogExecution";
import {Transactional} from "@coreShared/decorators/Transactional";
import {Transaction} from "sequelize";
import {ResultType} from "@coreShared/types/result.type";
import {UseCaseResponseUtil} from "@coreShared/utils/useCaseResponse.util";
import {UpdateResultType} from "@coreShared/types/crudResult.type";
import {ErrorMessages} from "@coreShared/messages/errorMessages";
import {
    IUpdateUserCredentialTypeUseCase
} from "@user/useCases/updateUserCredentialType/IUpdateUserCredentialType.useCase";
import {
    UpdateUserCredentialTypeDTO,
    UpdateUserCredentialTypeResponseDTO
} from "@user/adapters/dtos/userCredentialType.dto";
import {IUserCredentialTypeService} from "@user/domain/services/interface/IUserCredentialType.service";

@injectable()
export class UpdateUserCredentialTypeUseCase implements IUpdateUserCredentialTypeUseCase {
    constructor(
        @inject("IUserCredentialTypeService") private readonly service: IUserCredentialTypeService
    ) {
    }

    @LogExecution()
    @Transactional()
    async execute(input: UpdateUserCredentialTypeDTO, transaction?: Transaction): Promise<ResultType<UpdateResultType<UpdateUserCredentialTypeResponseDTO>>> {
        if (!transaction) {
            return ResultType.failure(new Error(ErrorMessages.failure.transactionCreation));
        }

        try {
            const updatedEntity: UpdateResultType<UpdateUserCredentialTypeResponseDTO> = await this.service.update(input, transaction);

            return ResultType.success(updatedEntity);
        } catch (error) {
            return UseCaseResponseUtil.handleResultError(error);
        }
    }
}