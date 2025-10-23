import {inject, injectable} from "tsyringe";
import {Transactional} from "@coreShared/decorators/Transactional";
import {Transaction} from "sequelize";
import {ResultType} from "@coreShared/types/result.type";
import {UseCaseResponseError} from "@coreShared/errors/useCaseResponse.error";
import {UpdateResultType} from "@coreShared/types/crudResult.type";
import {ErrorMessages} from "@coreShared/messages/errorMessages";
import {IUpdateStateUseCase} from "@location/useCases/update/updateState/IUpdateState.useCase";
import {IStateService} from "@location/domain/services/interfaces/IState.service";
import {UpdateStateDTO, UpdateStateResponseDTO} from "@location/adapters/dtos/state.dto";
import {LogError} from "@coreShared/decorators/LogError";

@injectable()
export class UpdateStateUseCase implements IUpdateStateUseCase {
    constructor(
        @inject("IStateService") private readonly service: IStateService
    ) {
    }

    @LogError()
    @Transactional()
    async execute(input: UpdateStateDTO, transaction?: Transaction): Promise<ResultType<UpdateResultType<UpdateStateResponseDTO>>> {
        if (!transaction) {
            return ResultType.failure(new Error(ErrorMessages.failure.transactionCreation));
        }

        try {
            const updatedEntity: UpdateResultType<UpdateStateResponseDTO> = await this.service.update(input, transaction);

            return ResultType.success(updatedEntity);
        } catch (error) {
            return UseCaseResponseError.handleResultError(error);
        }
    }
}