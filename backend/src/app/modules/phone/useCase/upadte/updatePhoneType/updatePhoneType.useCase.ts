import {inject, injectable} from "tsyringe";
import {IPhoneTypeService} from "@phone/domain/service/interfaces/IPhoneType.service";
import {Transactional} from "@coreShared/decorators/Transactional";
import {Transaction} from "sequelize";
import {ResultType} from "@coreShared/types/result.type";
import {ErrorMessages} from "@coreShared/messages/errorMessages";
import {UpdatePhoneTypeDTO, UpdatePhoneTypeResponseDTO} from "@phone/adapters/dtos/phoneType.dto";
import {UseCaseResponseUtil} from "@coreShared/utils/useCaseResponse.util";
import {UpdateResultType} from "@coreShared/types/crudResult.type";
import {IUpdatePhoneTypeUseCase} from "@phone/useCase/upadte/updatePhoneType/IUpdatePhoneType.useCase";
import {LogError} from "@coreShared/decorators/LogError";

@injectable()
export class UpdatePhoneTypeUseCase implements IUpdatePhoneTypeUseCase {
    constructor(
        @inject("IPhoneTypeService") private readonly phoneTypeService: IPhoneTypeService
    ) {
    }

    @LogError()
    @Transactional()
    async execute(request: UpdatePhoneTypeDTO, transaction?: Transaction): Promise<ResultType<UpdateResultType<UpdatePhoneTypeResponseDTO>>> {
        if (!transaction) {
            return ResultType.failure(new Error(ErrorMessages.failure.transactionCreation));
        }
        try {
            const updated: UpdateResultType<UpdatePhoneTypeResponseDTO> = await this.phoneTypeService.update(request, transaction);

            return ResultType.success(updated);
        } catch (error) {
            return UseCaseResponseUtil.handleResultError(error);
        }
    }
}