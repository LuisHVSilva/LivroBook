import {inject, injectable} from "tsyringe";
import {IDeletePhoneCodesUseCase} from "@phone/useCase/deletePhoneCode/IDeletePhoneCodes.useCase";
import {IPhoneCodeService} from "@phone/domain/service/interfaces/IPhoneCode.service";
import {LogExecution} from "@coreShared/decorators/LogExecution";
import {Transactional} from "@coreShared/decorators/Transactional";
import {DeletePhoneCodesDTO, DeletePhoneCodesResponseDTO} from "@phone/adapters/dtos/phoneCode.dto";
import {Transaction} from "sequelize";
import {ResultType} from "@coreShared/types/result.type";
import {ErrorMessages} from "@coreShared/messages/errorMessages";
import {UseCaseResponseUtil} from "@coreShared/utils/useCaseResponse.util";
import {StringUtil} from "@coreShared/utils/string.util";
import {DomainError} from "@coreShared/errors/domain.error";
import {EntitiesMessage} from "@coreShared/messages/entities.message";
import {PhoneCodeEntity} from "@phone/domain/entities/phoneCode.entity";

@injectable()
export class DeletePhoneCodesUseCase implements IDeletePhoneCodesUseCase {
    constructor(
        @inject("IPhoneCodeService") private readonly service: IPhoneCodeService,
    ) {
    }

    @LogExecution()
    @Transactional()
    async execute(input: DeletePhoneCodesDTO, transaction?: Transaction): Promise<ResultType<DeletePhoneCodesResponseDTO>> {
        if (!transaction) {
            return ResultType.failure(new Error(ErrorMessages.failure.transactionCreation));
        }

        try {
            const ids: number[] | undefined = StringUtil.parseCsvFilter(input.ids, Number);
            if (!ids) return ResultType.failure(new DomainError(EntitiesMessage.error.validation.idRequired));

            for (const id of ids) {
                await this.service.delete(id, transaction);
            }

            return ResultType.success({
                message: EntitiesMessage.success.delete(PhoneCodeEntity.ENTITY_NAME)
            });
        } catch (error) {
            return UseCaseResponseUtil.handleResultError(error);
        }
    }
}