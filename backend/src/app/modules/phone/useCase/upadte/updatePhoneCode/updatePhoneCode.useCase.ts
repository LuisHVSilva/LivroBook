import {inject, injectable} from "tsyringe";
import {IUpdatePhoneCodeUseCase} from "@phone/useCase/upadte/updatePhoneCode/IUpdatePhoneCode.useCase";
import {IPhoneCodeService} from "@phone/domain/service/interfaces/IPhoneCode.service";
import {Transactional} from "@coreShared/decorators/Transactional";
import {UpdatePhoneCodeDTO, UpdatePhoneCodeResponseDTO} from "@phone/adapters/dtos/phoneCode.dto";
import {Transaction} from "sequelize";
import {ResultType} from "@coreShared/types/result.type";
import {ErrorMessages} from "@coreShared/messages/errorMessages";
import {UseCaseResponseError} from "@coreShared/errors/useCaseResponse.error";
import {UpdateResultType} from "@coreShared/types/crudResult.type";
import {LogError} from "@coreShared/decorators/LogError";

@injectable()
export class UpdatePhoneCodeUseCase implements IUpdatePhoneCodeUseCase {
    constructor(
        @inject("IPhoneCodeService") private readonly service: IPhoneCodeService,
    ) {
    }

    @LogError()
    @Transactional()
    async execute(input: UpdatePhoneCodeDTO, transaction?: Transaction): Promise<ResultType<UpdateResultType<UpdatePhoneCodeResponseDTO>>> {
        if (!transaction) {
            return ResultType.failure(new Error(ErrorMessages.failure.transactionCreation));
        }

        try {
            const updated: UpdateResultType<UpdatePhoneCodeResponseDTO> = await this.service.update(input, transaction);

            return ResultType.success(updated)
        } catch (error) {
            return UseCaseResponseError.handleResultError(error);
        }
    }
}