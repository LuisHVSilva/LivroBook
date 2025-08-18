import {inject, injectable} from "tsyringe";
import {IUpdatePhoneUseCase} from "@phone/useCase/updatePhone/IUpdatePhone.useCase";
import {IPhoneService} from "@phone/domain/service/interfaces/IPhone.service";
import {LogExecution} from "@coreShared/decorators/LogExecution";
import {Transactional} from "@coreShared/decorators/Transactional";
import {UpdatePhoneDTO, UpdatePhoneResponseDTO} from "@phone/adapters/dtos/phone.dto";
import {ResultType} from "@coreShared/types/result.type";
import {Transaction} from "sequelize";
import {ErrorMessages} from "@coreShared/messages/errorMessages";
import {UseCaseResponseUtil} from "@coreShared/utils/useCaseResponse.util";
import {UpdateResultType} from "@coreShared/types/crudResult.type";
import {PhoneEntity} from "@phone/domain/entities/phone.entity";

@injectable()
export class UpdatePhoneUseCase implements IUpdatePhoneUseCase {
    constructor(
        @inject("IPhoneService") private readonly service: IPhoneService,
    ) {
    }

    @LogExecution()
    @Transactional()
    async execute(input: UpdatePhoneDTO, transaction?: Transaction): Promise<ResultType<UpdatePhoneResponseDTO>> {
        if (!transaction) {
            return ResultType.failure(new Error(ErrorMessages.failure.transactionCreation));
        }

        try {
            const updated: UpdateResultType<PhoneEntity> = await this.service.update(input, transaction);

            return ResultType.success({
                id: updated.entity.id!,
                number: updated.entity.number,
                phoneCodeId: updated.entity.phoneCodeId,
                phoneTypeId: updated.entity.phoneTypeId,
                statusId: updated.entity.statusId,
            })
        } catch (error) {
            return UseCaseResponseUtil.handleResultError(error);
        }
    }
}