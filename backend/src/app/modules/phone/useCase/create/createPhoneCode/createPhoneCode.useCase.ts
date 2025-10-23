import {inject, injectable} from "tsyringe";
import {ICreatePhoneCodeUseCase} from "@phone/useCase/create/createPhoneCode/ICreatePhoneCode.useCase";
import {IPhoneCodeService} from "@phone/domain/service/interfaces/IPhoneCode.service";
import {CreatePhoneCodeDTO, CreatePhoneCodeResponseDTO} from "@phone/adapters/dtos/phoneCode.dto";
import {Transaction} from "sequelize";
import {ResultType} from "@coreShared/types/result.type";
import {ErrorMessages} from "@coreShared/messages/errorMessages";
import {UseCaseResponseError} from "@coreShared/errors/useCaseResponse.error";
import {PhoneCodeEntity} from "@phone/domain/entities/phoneCode.entity";
import {Transactional} from "@coreShared/decorators/Transactional";
import {LogError} from "@coreShared/decorators/LogError";

@injectable()
export class CreatePhoneCodeUseCase implements ICreatePhoneCodeUseCase {
    constructor(
        @inject("IPhoneCodeService") private readonly service: IPhoneCodeService
    ) {
    }

    @LogError()
    @Transactional()
    async execute(input: CreatePhoneCodeDTO, transaction?: Transaction): Promise<ResultType<CreatePhoneCodeResponseDTO>> {
        if (!transaction) {
            return ResultType.failure(new Error(ErrorMessages.failure.transactionCreation));
        }

        try {
            const created: PhoneCodeEntity = await this.service.create(input, transaction);

            return ResultType.success(created)
        } catch (error) {
            return UseCaseResponseError.handleResultError(error);
        }
    }
}