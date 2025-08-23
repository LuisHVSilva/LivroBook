import {inject, injectable} from "tsyringe";
import {ICreatePhoneTypeUseCase} from "@phone/useCase/createPhoneType/ICreatePhoneType.useCase";
import {CreatePhoneTypeDTO, CreatePhoneTypeResponseDTO} from "@phone/adapters/dtos/phoneType.dto";
import {ResultType} from "@coreShared/types/result.type";
import {LogExecution} from "@coreShared/decorators/LogExecution";
import {Transactional} from "@coreShared/decorators/Transactional";
import {Transaction} from "sequelize";
import {UseCaseResponseUtil} from "@coreShared/utils/useCaseResponse.util";
import {IPhoneTypeService} from "@phone/domain/service/interfaces/IPhoneType.service";
import {PhoneTypeEntity} from "@phone/domain/entities/phoneType.entity";
import {ErrorMessages} from "@coreShared/messages/errorMessages";

@injectable()
export class CreatePhoneTypeUseCase implements ICreatePhoneTypeUseCase {
    constructor(
        @inject("IPhoneTypeService") private readonly phoneTypeService: IPhoneTypeService,
    ) {
    }

    @LogExecution()
    @Transactional()
    async execute(input: CreatePhoneTypeDTO, transaction?: Transaction): Promise<ResultType<CreatePhoneTypeResponseDTO>> {
        if (!transaction) {
            return ResultType.failure(new Error(ErrorMessages.failure.transactionCreation));
        }

        try {
            const created: PhoneTypeEntity = await this.phoneTypeService.create(input, transaction);

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