import {inject, injectable} from "tsyringe";
import {ICreatePhoneCodeUseCase} from "@phone/useCase/createPhoneCode/ICreatePhoneCode.useCase";
import {IPhoneCodeService} from "@phone/domain/service/interfaces/IPhoneCode.service";
import {LogExecution} from "@coreShared/decorators/LogExecution";
import {CreatePhoneCodeDTO, CreatePhoneCodeResponseDTO} from "@phone/adapters/dtos/phoneCode.dto";
import {Transaction} from "sequelize";
import {ResultType} from "@coreShared/types/result.type";
import {ErrorMessages} from "@coreShared/messages/errorMessages";
import {UseCaseResponseUtil} from "@coreShared/utils/useCaseResponse.util";
import {CreateResultType} from "@coreShared/types/crudResult.type";
import {PhoneCodeEntity} from "@phone/domain/entities/phoneCode.entity";
import {Transactional} from "@coreShared/decorators/Transactional";

@injectable()
export class CreatePhoneCodeUseCase implements ICreatePhoneCodeUseCase {
    constructor(
        @inject("IPhoneCodeService") private readonly service: IPhoneCodeService
    ) {
    }

    @LogExecution()
    @Transactional()
    async execute(input: CreatePhoneCodeDTO, transaction?: Transaction): Promise<ResultType<CreatePhoneCodeResponseDTO>> {
        if (!transaction) {
            return ResultType.failure(new Error(ErrorMessages.failure.transactionCreation));
        }

        try {
            const created: CreateResultType<PhoneCodeEntity> = await this.service.create(input, transaction);

            return ResultType.success({
                id: created.entity.id!,
                ddiCode: created.entity.ddiCode,
                dddCode: created.entity.dddCode,
                stateId: created.entity.stateId,
                statusId: created.entity.statusId
            })

        } catch (error) {
            return UseCaseResponseUtil.handleResultError(error);
        }
    }
}