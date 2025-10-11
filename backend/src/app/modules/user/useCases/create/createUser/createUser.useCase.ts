import {ICreateUserUseCase} from "@user/useCases/create/createUser/ICreateUser.useCase";
import {inject, injectable} from "tsyringe";
import {Transactional} from "@coreShared/decorators/Transactional";
import {Transaction} from "sequelize";
import {ResultType} from "@coreShared/types/result.type";
import {ErrorMessages} from "@coreShared/messages/errorMessages";
import {IUserService} from "@user/domain/services/interface/IUser.service";
import {CreateUserDTO, CreateUserRequestDTO, CreateUserResponseDTO} from "@user/adapters/dtos/user.dto";
import {UserEntity} from "@user/domain/entities/user.entity";
import {UserTypeEntity} from "@user/domain/entities/userType.entity";
import {IUserTypeService} from "@user/domain/services/interface/IUserType.service";
import {IUserCredentialService} from "@user/domain/services/interface/IUserCredential.service";
import {IPhoneService} from "@phone/domain/service/interfaces/IPhone.service";
import {UseCaseResponseUtil} from "@coreShared/utils/useCaseResponse.util";
import {LogError} from "@coreShared/decorators/LogError";

@injectable()
export class CreateUserUseCase implements ICreateUserUseCase {
    constructor(
        @inject("IUserService")
        private readonly service: IUserService,
        @inject("IUserTypeService")
        protected readonly userTypeService: IUserTypeService,
        @inject("IUserCredentialService")
        protected readonly userCredentialService: IUserCredentialService,
        @inject("IPhoneService")
        protected readonly phoneService: IPhoneService,
    ) {
    }

    @LogError()
    @Transactional()
    async execute(input: CreateUserRequestDTO, transaction?: Transaction): Promise<ResultType<CreateUserResponseDTO>> {
        if (!transaction) {
            return ResultType.failure(new Error(ErrorMessages.failure.transactionCreation));
        }

        try {
            if (input.phone) {
                await this.phoneService.create(input.phone, transaction);
            }

            const standardUserType: UserTypeEntity = await this.userTypeService.getStandardUserType();

            const createUserDTO: CreateUserDTO = {
                ...input,
                userType: standardUserType.description,
                phone: input.phone?.number
            }

            const created: UserEntity = await this.service.create(createUserDTO, transaction);

            await this.userCredentialService.create({
                userEmail: input.email,
                password: input.userCredential,
            }, transaction);


            return ResultType.success(created)
        } catch (error) {
            return UseCaseResponseUtil.handleResultError(error);
        }
    }
}