import {inject, injectable} from "tsyringe";
import {ICreatePhoneUseCase} from "@phone/useCase/create/createPhone/ICreatePhone.useCase";
import {IPhoneService} from "@phone/domain/service/interfaces/IPhone.service";
import {CreatePhoneDTO, CreatePhoneResponseDTO} from "@phone/adapters/dtos/phone.dto";
import {ResultType} from "@coreShared/types/result.type";
import {Transaction} from "sequelize";
import {Transactional} from "@coreShared/decorators/Transactional";
import {ErrorMessages} from "@coreShared/messages/errorMessages";
import {UseCaseResponseUtil} from "@coreShared/utils/useCaseResponse.util";
import {PhoneEntity} from "@phone/domain/entities/phone.entity";
import {LogError} from "@coreShared/decorators/LogError";

@injectable()
export class CreatePhoneUseCase implements ICreatePhoneUseCase {
    constructor(
        @inject("IPhoneService") private readonly service: IPhoneService,
    ) {
    }

    @LogError()
    @Transactional()
    async execute(input: CreatePhoneDTO, transaction?: Transaction): Promise<ResultType<CreatePhoneResponseDTO>> {
        if (!transaction) {
            return ResultType.failure(new Error(ErrorMessages.failure.transactionCreation));
        }

        try {
            const created: PhoneEntity = await this.service.create(input, transaction);

            return ResultType.success(created);
        } catch (error) {
            return UseCaseResponseUtil.handleResultError(error);
        }
    }
}