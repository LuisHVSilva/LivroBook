import {inject, injectable} from "tsyringe";
import {ICreatePhoneUseCase} from "@phone/useCase/createPhone/ICreatePhone.useCase";
import {IPhoneService} from "@phone/domain/service/interfaces/IPhone.service";
import {CreatePhoneDTO, CreatePhoneResponseDTO} from "@phone/adapters/dtos/phone.dto";
import {ResultType} from "@coreShared/types/result.type";
import {Transaction} from "sequelize";
import {Transactional} from "@coreShared/decorators/Transactional";
import {LogExecution} from "@coreShared/decorators/LogExecution";
import {ErrorMessages} from "@coreShared/messages/errorMessages";
import {UseCaseResponseUtil} from "@coreShared/utils/useCaseResponse.util";
import {CreateResultType} from "@coreShared/types/crudResult.type";
import {PhoneEntity} from "@phone/domain/entities/phone.entity";

@injectable()
export class CreatePhoneUseCase implements ICreatePhoneUseCase {
    constructor(
        @inject("IPhoneService") private readonly service: IPhoneService,
    ) {
    }

    @LogExecution()
    @Transactional()
    async execute(input: CreatePhoneDTO, transaction?: Transaction): Promise<ResultType<CreatePhoneResponseDTO>> {
        if (!transaction) {
            return ResultType.failure(new Error(ErrorMessages.failure.transactionCreation));
        }

        try {
            const created: CreateResultType<PhoneEntity> = await this.service.create(input, transaction);

            return ResultType.success({
                id: created.entity.id!,
                number: created.entity.number,
                phoneCodeId: created.entity.phoneCodeId,
                phoneTypeId: created.entity.phoneTypeId,
                statusId: created.entity.statusId,
            });
        } catch (error) {
            return UseCaseResponseUtil.handleResultError(error);
        }
    }
}