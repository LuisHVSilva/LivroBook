import {ICreateUserUseCase} from "@user/useCases/createUser/ICreateUser.useCase";
import {inject, injectable} from "tsyringe";
import {LogExecution} from "@coreShared/decorators/LogExecution";
import {Transactional} from "@coreShared/decorators/Transactional";
import {Transaction} from "sequelize";
import {ResultType} from "@coreShared/types/result.type";
import {ErrorMessages} from "@coreShared/messages/errorMessages";
import {IUserService} from "@user/domain/services/interface/IUser.service";
import {CreateUserDTO, CreateUserRequestDTO, CreateUserResponseDTO} from "@user/adapters/dtos/user.dto";
import {UserEntity} from "@user/domain/entities/user.entity";
import {UserTypeEntity} from "@user/domain/entities/userType.entity";
import {UserCredentialEntity} from "@user/domain/entities/userCredential.entity";
import {IUserTypeService} from "@user/domain/services/interface/IUserType.service";
import {IUserCredentialService} from "@user/domain/services/interface/IUserCredential.service";
import {IPhoneService} from "@phone/domain/service/interfaces/IPhone.service";
import {UseCaseResponseUtil} from "@coreShared/utils/useCaseResponse.util";

@injectable()
export class CreateUserUseCase implements ICreateUserUseCase {
    constructor(
        @inject("IUserService") private readonly service: IUserService,
        @inject("IUserTypeService") protected readonly userTypeService: IUserTypeService,
        @inject("IUserCredentialService") protected readonly userCredentialService: IUserCredentialService,
        @inject("IPhoneService") protected readonly phoneService: IPhoneService,
    ) {
    }

    @LogExecution()
    @Transactional()
    async execute(input: CreateUserRequestDTO, transaction?: Transaction): Promise<ResultType<CreateUserResponseDTO>> {
        if (!transaction) {
            return ResultType.failure(new Error(ErrorMessages.failure.transactionCreation));
        }

        try {
            const standardUserType: UserTypeEntity = await this.userTypeService.getStandardUserType();
            const userCredential: UserCredentialEntity = await this.userCredentialService.create(input.userCredential, transaction);

            const createUserDTO: CreateUserDTO = {
                ...input,
                userTypeId: standardUserType.id!,
                userCredentialId: userCredential.id!,
            }

            if (input.phone) {
                createUserDTO.phoneId = (await this.phoneService.create(input.phone, transaction)).id!;
            }

            const created: UserEntity = await this.service.create(createUserDTO, transaction);

            return ResultType.success(created)
        } catch (error) {
            return UseCaseResponseUtil.handleResultError(error);
        }
    }
}