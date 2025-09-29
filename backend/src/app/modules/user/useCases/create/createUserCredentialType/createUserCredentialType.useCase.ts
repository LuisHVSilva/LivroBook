import {inject, injectable} from "tsyringe";
import {LogExecution} from "@coreShared/decorators/LogExecution";
import {Transaction} from "sequelize";
import {ResultType} from "@coreShared/types/result.type";
import {UseCaseResponseUtil} from "@coreShared/utils/useCaseResponse.util";
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

@injectable()
export class CreateUserCredentialTypeUseCase implements ICreateUserCredentialTypeUseCase {
    constructor(
        @inject("IUserCredentialTypeService") private readonly service: IUserCredentialTypeService
    ) {
    }

    @LogExecution()
    @Transactional()
    async execute(input: CreateUserCredentialTypeDTO, transaction?: Transaction): Promise<ResultType<CreateUserCredentialTypeResponseDTO>> {
        if (!transaction) {
            return ResultType.failure(new Error(ErrorMessages.failure.transactionCreation));
        }

        try {
            const created: UserCredentialTypeEntity = await this.service.create(input, transaction);

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