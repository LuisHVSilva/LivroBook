import {inject, injectable} from "tsyringe";
import {ICreatePhoneTypeUseCase} from "@phone/useCase/create/createPhoneType/ICreatePhoneType.useCase";
import {CreatePhoneTypeDTO, CreatePhoneTypeResponseDTO} from "@phone/adapters/dtos/phoneType.dto";
import {ResultType} from "@coreShared/types/result.type";
import {Transactional} from "@coreShared/decorators/Transactional";
import {Transaction} from "sequelize";
import {UseCaseResponseError} from "@coreShared/errors/useCaseResponse.error";
import {IPhoneTypeService} from "@phone/domain/service/interfaces/IPhoneType.service";
import {PhoneTypeEntity} from "@phone/domain/entities/phoneType.entity";
import {ErrorMessages} from "@coreShared/messages/errorMessages";
import {LogError} from "@coreShared/decorators/LogError";

@injectable()
export class CreatePhoneTypeUseCase implements ICreatePhoneTypeUseCase {
    constructor(
        @inject("IPhoneTypeService") private readonly phoneTypeService: IPhoneTypeService,
    ) {
    }

    @LogError()
    @Transactional()
    async execute(input: CreatePhoneTypeDTO, transaction?: Transaction): Promise<ResultType<CreatePhoneTypeResponseDTO>> {
        if (!transaction) {
            return ResultType.failure(new Error(ErrorMessages.failure.transactionCreation));
        }

        try {
            const created: PhoneTypeEntity = await this.phoneTypeService.create(input, transaction);

            return ResultType.success(created)
        } catch (error) {
            return UseCaseResponseError.handleResultError(error);
        }
    }
}