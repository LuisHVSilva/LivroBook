import {inject, injectable} from "tsyringe";
import {LogExecution} from "@coreShared/decorators/LogExecution";
import {Transactional} from "@coreShared/decorators/Transactional";
import {Transaction} from "sequelize";
import {ResultType} from "@coreShared/types/result.type";
import {UseCaseResponseUtil} from "@coreShared/utils/useCaseResponse.util";
import {UpdateResultType} from "@coreShared/types/crudResult.type";
import {ErrorMessages} from "@coreShared/messages/errorMessages";
import {IUpdateUserCredentialUseCase} from "@user/useCases/updateUserCredential/IUpdateUserCredential.useCase";
import {IUserCredentialService} from "@user/domain/services/interface/IUserCredential.service";
import {UpdateUserCredentialDTO, UpdateUserCredentialResponseDTO} from "@user/adapters/dtos/userCredential.dto";

@injectable()
export class UpdateUserCredentialUseCase implements IUpdateUserCredentialUseCase {
    constructor(
        @inject("IUserCredentialService") private readonly service: IUserCredentialService
    ) {
    }

    @LogExecution()
    @Transactional()
    async execute(input: UpdateUserCredentialDTO, transaction?: Transaction): Promise<ResultType<UpdateResultType<UpdateUserCredentialResponseDTO>>> {
        if (!transaction) {
            return ResultType.failure(new Error(ErrorMessages.failure.transactionCreation));
        }

        try {
            const updatedEntity: UpdateResultType<UpdateUserCredentialResponseDTO> = await this.service.update(input, transaction);

            return ResultType.success(updatedEntity);
        } catch (error) {
            return UseCaseResponseUtil.handleResultError(error);
        }
    }
}