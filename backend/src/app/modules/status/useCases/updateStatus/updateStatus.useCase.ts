import {inject, injectable} from "tsyringe";
import {IUpdateStatusUseCase} from "./IUpdateStatus.useCase";
import {LogExecution} from "@coreShared/decorators/LogExecution";
import {Transactional} from "@coreShared/decorators/Transactional";
import {UpdateStatusDTO, UpdateStatusResponseDTO} from "@status/adapters/dtos/status.dto";
import {ResultType} from "@coreShared/types/result.type";
import {Transaction} from "sequelize";
import {UseCaseResponseUtil} from "@coreShared/utils/useCaseResponse.util";
import {StatusEntity} from "@status/domain/entities/status.entity";
import {IStatusService} from "@status/domain/services/interfaces/IStatus.service";

@injectable()
export class UpdateStatusUseCase implements IUpdateStatusUseCase {
    constructor(
        @inject("IStatusService") private readonly statusService: IStatusService,
    ) {
    }

    @LogExecution()
    @Transactional()
    async execute(input: UpdateStatusDTO, transaction?: Transaction): Promise<ResultType<UpdateStatusResponseDTO>> {
        try {
            const result: StatusEntity = await this.statusService.update(input, transaction!);

            const updatedStatus: UpdateStatusResponseDTO = {
                id: input.id,
                description: result.description,
                active: result.active,
            };

            return ResultType.success(updatedStatus);
        } catch (error) {
            return UseCaseResponseUtil.handleResultError(error);
        }
    }
}