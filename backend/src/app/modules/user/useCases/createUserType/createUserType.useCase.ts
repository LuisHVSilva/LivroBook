import {inject, injectable} from "tsyringe";
import {LogExecution} from "@coreShared/decorators/LogExecution";
import {Transaction} from "sequelize";
import {ResultType} from "@coreShared/types/result.type";
import {UseCaseResponseUtil} from "@coreShared/utils/useCaseResponse.util";
import {Transactional} from "@coreShared/decorators/Transactional";
import {ErrorMessages} from "@coreShared/messages/errorMessages";
import {ICreateUserTypeUseCase} from "@user/useCases/createUserType/ICreateUserType.useCase";
import {CreateUserTypeDTO, CreateUserTypeResponseDTO} from "@user/adapters/dtos/userType.dto";
import {IUserTypeService} from "@user/domain/services/interface/IUserType.service";
import {UserTypeEntity} from "@user/domain/entities/userType.entity";

@injectable()
export class CreateUserTypeUseCase implements ICreateUserTypeUseCase {
    constructor(
        @inject("IUserTypeService") private readonly service: IUserTypeService
    ) {
    }

    @LogExecution()
    @Transactional()
    async execute(input: CreateUserTypeDTO, transaction?: Transaction): Promise<ResultType<CreateUserTypeResponseDTO>> {
        if (!transaction) {
            return ResultType.failure(new Error(ErrorMessages.failure.transactionCreation));
        }

        try {
            const created: UserTypeEntity = await this.service.create(input, transaction);

            return ResultType.success({
                id: created.id!,
                description: created.description,
                statusId: created.statusId
            })

        } catch (error) {
            return UseCaseResponseUtil.handleResultError(error);
        }
    }
}