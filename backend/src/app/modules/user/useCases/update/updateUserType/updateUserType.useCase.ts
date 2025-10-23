import {inject, injectable} from "tsyringe";
import {LogExecution} from "@coreShared/decorators/LogExecution";
import {Transactional} from "@coreShared/decorators/Transactional";
import {Transaction} from "sequelize";
import {ResultType} from "@coreShared/types/result.type";
import {UseCaseResponseError} from "@coreShared/errors/useCaseResponse.error";
import {UpdateResultType} from "@coreShared/types/crudResult.type";
import {ErrorMessages} from "@coreShared/messages/errorMessages";
import {IUpdateUserTypeUseCase} from "@user/useCases/update/updateUserType/IUpdateUserType.useCase";
import {IUserTypeService} from "@user/domain/services/interface/IUserType.service";
import {UpdateUserTypeDTO, UpdateUserTypeResponseDTO} from "@user/adapters/dtos/userType.dto";


@injectable()
export class UpdateUserTypeUseCase implements IUpdateUserTypeUseCase {
    constructor(
        @inject("IUserTypeService") private readonly service: IUserTypeService
    ) {
    }

    @LogExecution()
    @Transactional()
    async execute(input: UpdateUserTypeDTO, transaction?: Transaction): Promise<ResultType<UpdateResultType<UpdateUserTypeResponseDTO>>> {
        if (!transaction) {
            return ResultType.failure(new Error(ErrorMessages.failure.transactionCreation));
        }

        try {
            const updatedEntity: UpdateResultType<UpdateUserTypeResponseDTO> = await this.service.update(input, transaction);

            return ResultType.success(updatedEntity);
        } catch (error) {
            return UseCaseResponseError.handleResultError(error);
        }
    }
}