import {inject, injectable} from "tsyringe";
import {Transaction} from "sequelize";
import {ResultType} from "@coreShared/types/result.type";
import {UseCaseResponseError} from "@coreShared/errors/useCaseResponse.error";
import {Transactional} from "@coreShared/decorators/Transactional";
import {ErrorMessages} from "@coreShared/messages/errorMessages";
import {
    ICreateUserCredentialTypeUseCase
} from "@user/useCases/create/createUserCredentialType/ICreateUserCredentialType.useCase";
import {IUserCredentialTypeService} from "@user/domain/services/interface/IUserCredentialType.service";
import {
    CreateUserCredentialTypeDTO,
    CreateUserCredentialTypeResponseDTO
} from "@user/adapters/dtos/userCredentialType.dto";
import {UserCredentialTypeEntity} from "@user/domain/entities/userCredentialType.entity";
import {LogError} from "@coreShared/decorators/LogError";

@injectable()
export class CreateUserCredentialTypeUseCase implements ICreateUserCredentialTypeUseCase {
    constructor(
        @inject("IUserCredentialTypeService") private readonly service: IUserCredentialTypeService
    ) {
    }

    @LogError()
    @Transactional()
    async execute(input: CreateUserCredentialTypeDTO, transaction?: Transaction): Promise<ResultType<CreateUserCredentialTypeResponseDTO>> {
        if (!transaction) {
            return ResultType.failure(new Error(ErrorMessages.failure.transactionCreation));
        }

        try {
            const created: UserCredentialTypeEntity = await this.service.create(input, transaction);

            return ResultType.success(created)
        } catch (error) {
            return UseCaseResponseError.handleResultError(error);
        }
    }
}