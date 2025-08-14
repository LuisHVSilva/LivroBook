import {inject, injectable} from "tsyringe";
import {IDeletePhoneTypesUseCase} from "@phone/useCase/deletePhoneTypes/IDeletePhoneTypes.useCase";
import {IPhoneTypeService} from "@phone/domain/service/interfaces/IPhoneType.service";
import {LogExecution} from "@coreShared/decorators/LogExecution";
import {Transactional} from "@coreShared/decorators/Transactional";
import {DeletePhoneTypesResponseDTO, DeletePhoneTypesDTO} from "@phone/adapters/dtos/phoneType.dto";
import {ResultType} from "@coreShared/types/result.type";
import {Transaction} from "sequelize";
import {ErrorMessages} from "@coreShared/messages/errorMessages";
import {UseCaseResponseUtil} from "@coreShared/utils/useCaseResponse.util";
import {StringUtil} from "@coreShared/utils/string.util";
import {DomainError} from "@coreShared/errors/domain.error";
import {EntitiesMessage} from "@coreShared/messages/entities.message";
import {PhoneTypeEntity} from "@phone/domain/entities/phoneType.entity";

@injectable()
export class DeletePhoneTypesUseCase implements IDeletePhoneTypesUseCase {
    constructor(
        @inject("IPhoneTypeService") private readonly service: IPhoneTypeService
    ) {
    }

    @LogExecution()
    @Transactional()
    async execute(input: DeletePhoneTypesDTO, transaction?: Transaction): Promise<ResultType<DeletePhoneTypesResponseDTO>> {
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
                message: EntitiesMessage.success.delete(PhoneTypeEntity.ENTITY_NAME)
            });
        } catch (error) {
            return UseCaseResponseUtil.handleResultError(error);
        }
    }
}