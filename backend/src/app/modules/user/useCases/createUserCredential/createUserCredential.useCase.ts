import {ICreateUserCredentialUseCase} from "@user/useCases/createUserCredential/ICreateUserCredential.useCase";
import {inject, injectable} from "tsyringe";
import {LogExecution} from "@coreShared/decorators/LogExecution";
import {Transactional} from "@coreShared/decorators/Transactional";
import {Transaction} from "sequelize";
import {ResultType} from "@coreShared/types/result.type";
import {ErrorMessages} from "@coreShared/messages/errorMessages";
import {UseCaseResponseUtil} from "@coreShared/utils/useCaseResponse.util";
import {IUserCredentialService} from "@user/domain/services/interface/IUserCredential.service";
import {CreateUserCredentialRequestDTO, CreateUserCredentialResponseDTO} from "@user/adapters/dtos/userCredential.dto";
import {UserCredentialEntity} from "@user/domain/entities/userCredential.entity";

@injectable()
export class CreateUserCredentialUseCase implements ICreateUserCredentialUseCase {
    constructor(
        @inject("IUserCredentialService") private readonly service: IUserCredentialService,
    ) {
    }

    @LogExecution()
    @Transactional()
    async execute(input: CreateUserCredentialRequestDTO, transaction?: Transaction): Promise<ResultType<CreateUserCredentialResponseDTO>> {
        if (!transaction) {
            return ResultType.failure(new Error(ErrorMessages.failure.transactionCreation));
        }

        try {
            const created: UserCredentialEntity = await this.service.create(input, transaction);
            const response: CreateUserCredentialResponseDTO = {
                id: created.id,
                loginAttempts: created.loginAttempts,
                isTwoFactorEnable: created.isTwoFactorEnable,
                isEmailVerified: created.isEmailVerified,
                lastLoginIP: created.lastLoginIp,
                lastLoginAt: created.lastLoginAt,
                userCredentialTypeId: created.userCredentialTypeId,
                statusId: created.statusId,
            };

            return ResultType.success(response)

        } catch (error) {
            return UseCaseResponseUtil.handleResultError(error);
        }
    }
}