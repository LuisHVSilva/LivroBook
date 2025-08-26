import {inject, injectable} from "tsyringe";
import {LogExecution} from "@coreShared/decorators/LogExecution";
import {Transactional} from "@coreShared/decorators/Transactional";
import {Transaction} from "sequelize";
import {ResultType} from "@coreShared/types/result.type";
import {UseCaseResponseUtil} from "@coreShared/utils/useCaseResponse.util";
import {UpdateResultType} from "@coreShared/types/crudResult.type";
import {ErrorMessages} from "@coreShared/messages/errorMessages";
import {IUpdateStateUseCase} from "@location/useCases/updateState/IUpdateState.useCase";
import {IStateService} from "@location/domain/services/interfaces/IState.service";
import {UpdateStateDTO} from "@location/adapters/dtos/state.dto";
import {StateEntity} from "@location/domain/entities/state.entity";

@injectable()
export class UpdateStateUseCase implements IUpdateStateUseCase {
    constructor(
        @inject("IStateService") private readonly service: IStateService
    ) {
    }

    @LogExecution()
    @Transactional()
    async execute(input: UpdateStateDTO, transaction?: Transaction): Promise<ResultType<UpdateResultType<StateEntity>>> {
        if (!transaction) {
            return ResultType.failure(new Error(ErrorMessages.failure.transactionCreation));
        }

        try {
            const updatedEntity: UpdateResultType<StateEntity> = await this.service.update(input, transaction);

            return ResultType.success(updatedEntity);
        } catch (error) {
            return UseCaseResponseUtil.handleResultError(error);
        }
    }
}