import {inject, injectable} from "tsyringe";
import {Transaction} from "sequelize";
import {ResultType} from "@coreShared/types/result.type";
import {ErrorMessages} from "@coreShared/messages/errorMessages";
import {UseCaseResponseError} from "@coreShared/errors/useCaseResponse.error";
import {StringUtil} from "@coreShared/utils/string.util";
import {DomainError} from "@coreShared/errors/classes.error";
import {EntitiesMessage} from "@coreShared/messages/entities.message";
import {Transactional} from "@coreShared/decorators/Transactional";
import {DeleteRequestDTO, DeleteResponseDTO} from "@coreShared/dtos/operation.dto";
import {DeleteReport} from "@coreShared/utils/operationReport.util";
import {IUserCredentialTypeService} from "@user/domain/services/interface/IUserCredentialType.service";
import {LogError} from "@coreShared/decorators/LogError";
import {
    IDeleteUserCredentialTypeUseCase
} from "@user/useCases/delete/deleteUserCredentialType/IDeleteUserCredentialType.useCase";

@injectable()
export class DeleteUserCredentialTypeUseCase implements IDeleteUserCredentialTypeUseCase {
    constructor(
        @inject("IUserCredentialTypeService") private readonly service: IUserCredentialTypeService
    ) {
    }

    @LogError()
    @Transactional()
    async execute(input: DeleteRequestDTO, transaction?: Transaction): Promise<ResultType<DeleteResponseDTO>> {
        if (!transaction) {
            return ResultType.failure(new Error(ErrorMessages.failure.transactionCreation));
        }

        try {
            const ids: number[] | undefined = StringUtil.parseCsvFilter(input.id, Number);
            if (!ids) return ResultType.failure(new DomainError(EntitiesMessage.error.validation.idRequired));

            const report: DeleteReport = await this.service.deleteMany(ids, transaction!);

            return ResultType.success({
                report
            });
        } catch (error) {
            return UseCaseResponseError.handleResultError(error);
        }
    }
}