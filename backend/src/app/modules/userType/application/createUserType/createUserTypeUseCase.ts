import "reflect-metadata";
import {inject, injectable} from "tsyringe";
import {ICreateUserTypeUseCase} from "@userType/application/createUserType/ICreateUserTypeUseCase";
import {CreateUserTypeInputDTO, CreateUserTypeOutputDTO} from "@userType/adapters/dtos/createUserTypeDTO";
import {Result} from "@coreShared/types/Result";
import {ILogger} from "@coreShared/logs/ILogger";
import {UserType} from "@userType/domain/userType";
import {IUserTypeRepository} from "@userType/infrastructure/repository/IUserTypeRepository";
import {UseCaseError} from "@coreShared/errors/useCaseError";
import {ValidateError} from "@coreShared/errors/ValidateError";
import {IUserTypeDomainService} from "@userType/domain/service/IUserTypeDomainService";
import {IStatusDomainService} from "@status/domain/service/IStatusDomainService";
import {LoggerMessages} from "@coreShared/messages/loggerMessages";
import {ErrorMessages} from "@coreShared/messages/errorMessages";
import {UserTypePresenter} from "@userType/application/userTypePresenter";
import {UserTypeMessages} from "@coreShared/messages/userTypeMessages";

@injectable()
export class CreateUserTypeUseCase implements ICreateUserTypeUseCase {
    private readonly className: string = "CreateUserTypeUseCase";

    constructor(
        @inject("IUserTypeRepository") private readonly repository: IUserTypeRepository,
        @inject("ILogger") private readonly logger: ILogger,
        @inject("IUserTypeDomainService") private readonly userTypeDomainService: IUserTypeDomainService,
        @inject("IStatusDomainService") private readonly statusDomainService: IStatusDomainService,
    ) {
    }

    private async validateInput(input: CreateUserTypeInputDTO): Promise<CreateUserTypeInputDTO> {
        if (!input.description) {
            const error = new ValidateError(this.className, UserTypeMessages.Error.Validation.INVALID_DESCRIPTION_NULL);
            await this.logger.logError(this.className, "validateInput", error);
            throw error;
        }

        return {description: input.description}
    }

    private mapToOutput(userType: UserType): CreateUserTypeOutputDTO {
        return UserTypePresenter.toCreateOutputDTO(userType);
    }

    public async execute(input: CreateUserTypeInputDTO): Promise<Result<CreateUserTypeOutputDTO, UseCaseError>> {
        const method: string = "execute";
        await this.logger.logInfo(this.className, method, LoggerMessages.Info.START_EXECUTION);
        const transaction = await this.repository.startTransaction();

        try {
            const {description} = await this.validateInput(input);
            const userType: UserType = await UserType.create(description, this.userTypeDomainService, this.statusDomainService);
            const newUserType: UserType = (await this.repository.create(userType)).unwrapOrThrow(UserType.restore);
            await transaction.commit();

            const output: CreateUserTypeOutputDTO = this.mapToOutput(newUserType);
            await this.logger.logInfo(this.className, method, output.message);

            return Result.success(output);
        } catch (e) {
            await transaction.rollback();
            const message: string = e instanceof Error ? e.message : ErrorMessages.Internal.INTERNAL_ERROR;
            const error = new UseCaseError(this.className, message);
            await this.logger.logError(this.className, method, error);
            return Result.failure(error)
        }
    }
}