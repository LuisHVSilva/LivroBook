import {inject, injectable} from "tsyringe";
import {LogExecution} from "@coreShared/decorators/LogExecution";
import {Transactional} from "@coreShared/decorators/Transactional";
import {Transaction} from "sequelize";
import {ResultType} from "@coreShared/types/result.type";
import {UseCaseResponseError} from "@coreShared/errors/useCaseResponse.error";
import {UpdateResultType} from "@coreShared/types/crudResult.type";
import {ErrorMessages} from "@coreShared/messages/errorMessages";
import {IUpdateUserUseCase} from "@user/useCases/update/updateUser/IUpdateUser.useCase";
import {IUserService} from "@user/domain/services/interface/IUser.service";
import {UpdateUserDTO, UpdateUserResponseDTO} from "@user/adapters/dtos/user.dto";

@injectable()
export class UpdateUserUseCase implements IUpdateUserUseCase {
    constructor(
        @inject("IUserService") private readonly service: IUserService
    ) {
    }

    @LogExecution()
    @Transactional()
    async execute(input: UpdateUserDTO, transaction?: Transaction): Promise<ResultType<UpdateResultType<UpdateUserResponseDTO>>> {
        if (!transaction) {
            return ResultType.failure(new Error(ErrorMessages.failure.transactionCreation));
        }

        try {
            const updatedEntity: UpdateResultType<UpdateUserResponseDTO> = await this.service.update(input, transaction);

            return ResultType.success(updatedEntity);
        } catch (error) {
            return UseCaseResponseError.handleResultError(error);
        }
    }
}