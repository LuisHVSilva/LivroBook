import {inject, injectable} from "tsyringe";
import {Transaction} from "sequelize";
import {ResultType} from "@coreShared/types/result.type";
import {UseCaseResponseError} from "@coreShared/errors/useCaseResponse.error";
import {Transactional} from "@coreShared/decorators/Transactional";
import {ErrorMessages} from "@coreShared/messages/errorMessages";
import {ICreateUserTypeUseCase} from "@user/useCases/create/createUserType/ICreateUserType.useCase";
import {CreateUserTypeDTO, CreateUserTypeResponseDTO} from "@user/adapters/dtos/userType.dto";
import {IUserTypeService} from "@user/domain/services/interface/IUserType.service";
import {UserTypeEntity} from "@user/domain/entities/userType.entity";
import {LogError} from "@coreShared/decorators/LogError";

@injectable()
export class CreateUserTypeUseCase implements ICreateUserTypeUseCase {
    constructor(
        @inject("IUserTypeService")
        private readonly service: IUserTypeService
    ) {
    }

    @LogError()
    @Transactional()
    async execute(input: CreateUserTypeDTO, transaction?: Transaction): Promise<ResultType<CreateUserTypeResponseDTO>> {
        if (!transaction) {
            return ResultType.failure(new Error(ErrorMessages.failure.transactionCreation));
        }

        try {
            const created: UserTypeEntity = await this.service.create(input, transaction);

            return ResultType.success(created)
        } catch (error) {
            return UseCaseResponseError.handleResultError(error);
        }
    }
}