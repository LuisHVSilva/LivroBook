import {inject, injectable} from "tsyringe";
import {LogExecution} from "@coreShared/decorators/LogExecution";
import {Transactional} from "@coreShared/decorators/Transactional";
import {Transaction} from "sequelize";
import {ResultType} from "@coreShared/types/result.type";
import {UseCaseResponseUtil} from "@coreShared/utils/useCaseResponse.util";
import {UpdateResultType} from "@coreShared/types/crudResult.type";
import {ErrorMessages} from "@coreShared/messages/errorMessages";
import {IUpdateUserTypeUseCase} from "@user/useCases/updateUserType/IUpdateUserType.useCase";
import {IUserTypeService} from "@user/domain/services/interface/IUserType.service";
import {UpdateUserTypeDTO} from "@user/adapters/dtos/userType.dto";
import {UserTypeEntity} from "@user/domain/entities/userType.entity";

@injectable()
export class UpdateUserTypeUseCase implements IUpdateUserTypeUseCase {
    constructor(
        @inject("IUserTypeService") private readonly service: IUserTypeService
    ) {
    }

    @LogExecution()
    @Transactional()
    async execute(input: UpdateUserTypeDTO, transaction?: Transaction): Promise<ResultType<UpdateResultType<UserTypeEntity>>> {
        if (!transaction) {
            return ResultType.failure(new Error(ErrorMessages.failure.transactionCreation));
        }

        try {
            const updatedEntity: UpdateResultType<UserTypeEntity> = await this.service.update(input, transaction);

            return ResultType.success(updatedEntity);
        } catch (error) {
            return UseCaseResponseUtil.handleResultError(error);
        }
    }
}