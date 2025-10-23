import {inject, injectable} from "tsyringe";
import {Transactional} from "@coreShared/decorators/Transactional";
import {Transaction} from "sequelize";
import {ResultType} from "@coreShared/types/result.type";
import {UseCaseResponseError} from "@coreShared/errors/useCaseResponse.error";
import {UpdateResultType} from "@coreShared/types/crudResult.type";
import {ErrorMessages} from "@coreShared/messages/errorMessages";
import {
    IUpdateUserCredentialTypeUseCase
} from "@user/useCases/update/updateUserCredentialType/IUpdateUserCredentialType.useCase";
import {
    UpdateUserCredentialTypeDTO,
    UpdateUserCredentialTypeResponseDTO
} from "@user/adapters/dtos/userCredentialType.dto";
import {IUserCredentialTypeService} from "@user/domain/services/interface/IUserCredentialType.service";
import {LogError} from "@coreShared/decorators/LogError";

@injectable()
export class UpdateUserCredentialTypeUseCase implements IUpdateUserCredentialTypeUseCase {
    constructor(
        @inject("IUserCredentialTypeService") private readonly service: IUserCredentialTypeService
    ) {
    }

    @LogError()
    @Transactional()
    async execute(input: UpdateUserCredentialTypeDTO, transaction?: Transaction): Promise<ResultType<UpdateResultType<UpdateUserCredentialTypeResponseDTO>>> {
        if (!transaction) {
            return ResultType.failure(new Error(ErrorMessages.failure.transactionCreation));
        }

        try {
            const updatedEntity: UpdateResultType<UpdateUserCredentialTypeResponseDTO> = await this.service.update(input, transaction);

            return ResultType.success(updatedEntity);
        } catch (error) {
            return UseCaseResponseError.handleResultError(error);
        }
    }
}