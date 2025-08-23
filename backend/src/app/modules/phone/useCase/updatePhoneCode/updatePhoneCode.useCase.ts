import {inject, injectable} from "tsyringe";
import {IUpdatePhoneCodeUseCase} from "@phone/useCase/updatePhoneCode/IUpdatePhoneCode.useCase";
import {IPhoneCodeService} from "@phone/domain/service/interfaces/IPhoneCode.service";
import {LogExecution} from "@coreShared/decorators/LogExecution";
import {Transactional} from "@coreShared/decorators/Transactional";
import {UpdatePhoneCodeDTO} from "@phone/adapters/dtos/phoneCode.dto";
import {Transaction} from "sequelize";
import {ResultType} from "@coreShared/types/result.type";
import {ErrorMessages} from "@coreShared/messages/errorMessages";
import {UseCaseResponseUtil} from "@coreShared/utils/useCaseResponse.util";
import {UpdateResultType} from "@coreShared/types/crudResult.type";
import {PhoneCodeEntity} from "@phone/domain/entities/phoneCode.entity";

@injectable()
export class UpdatePhoneCodeUseCase implements IUpdatePhoneCodeUseCase {
    constructor(
        @inject("IPhoneCodeService") private readonly service: IPhoneCodeService,
    ) {
    }

    @LogExecution()
    @Transactional()
    async execute(input: UpdatePhoneCodeDTO, transaction?: Transaction): Promise<ResultType<UpdateResultType<PhoneCodeEntity>>> {
        if (!transaction) {
            return ResultType.failure(new Error(ErrorMessages.failure.transactionCreation));
        }

        try {
            const updated: UpdateResultType<PhoneCodeEntity> = await this.service.update(input, transaction);

            return ResultType.success(updated)
        } catch (error) {
            return UseCaseResponseUtil.handleResultError(error);
        }
    }
}