import {inject, injectable} from "tsyringe";
import {IPhoneTypeService} from "@phone/domain/service/interfaces/IPhoneType.service";
import {LogExecution} from "@coreShared/decorators/LogExecution";
import {Transactional} from "@coreShared/decorators/Transactional";
import {Transaction} from "sequelize";
import {ResultType} from "@coreShared/types/result.type";
import {ErrorMessages} from "@coreShared/messages/errorMessages";
import {UpdatePhoneTypeDTO} from "@phone/adapters/dtos/phoneType.dto";
import {UseCaseResponseUtil} from "@coreShared/utils/useCaseResponse.util";
import {UpdateResultType} from "@coreShared/types/crudResult.type";
import {PhoneTypeEntity} from "@phone/domain/entities/phoneType.entity";
import {IUpdatePhoneTypeUseCase} from "@phone/useCase/updatePhoneType/IUpdatePhoneType.useCase";

@injectable()
export class UpdatePhoneTypeUseCase implements IUpdatePhoneTypeUseCase {
    constructor(
        @inject("IPhoneTypeService") private readonly phoneTypeService: IPhoneTypeService
    ) {
    }

    @LogExecution()
    @Transactional()
    async execute(request: UpdatePhoneTypeDTO, transaction?: Transaction): Promise<ResultType< UpdateResultType<PhoneTypeEntity>>> {
        if (!transaction) {
            return ResultType.failure(new Error(ErrorMessages.failure.transactionCreation));
        }
        try {
            const updated: UpdateResultType<PhoneTypeEntity> = await this.phoneTypeService.update(request, transaction);

            return ResultType.success(updated);
        } catch (error) {
            return UseCaseResponseUtil.handleResultError(error);
        }
    }
}