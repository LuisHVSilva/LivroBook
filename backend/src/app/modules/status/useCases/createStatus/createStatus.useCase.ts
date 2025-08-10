import "reflect-metadata";
import {inject, injectable} from "tsyringe";
import {ICreateStatusUseCase} from "@status/useCases/createStatus/ICreateStatus.useCase";
import {LogExecution} from "@coreShared/decorators/LogExecution";
import {ResultType} from "@coreShared/types/result.type";
import {Transactional} from "@coreShared/decorators/Transactional";
import {Transaction} from "sequelize";
import {CreateStatusDTO, CreateStatusResponseDTO} from "@status/adapters/dtos/status.dto";
import {UseCaseResponseUtil} from "@coreShared/utils/useCaseResponse.util";
import {IStatusService} from "@status/domain/services/interfaces/IStatus.service";
import {CreateResultType} from "@coreShared/types/crudResult.type";
import {StatusEntity} from "@status/domain/entities/status.entity";

@injectable()
export class CreateStatusUseCase implements ICreateStatusUseCase {
    constructor(
        @inject("IStatusService") private readonly statusService: IStatusService,
    ) {
    }

    @LogExecution()
    @Transactional()
    public async execute(input: CreateStatusDTO, transaction?: Transaction): Promise<ResultType<CreateStatusResponseDTO>> {
        try {
            const result: CreateResultType<StatusEntity> = await this.statusService.create(input, transaction!);

            return ResultType.success({
                id: result.entity.id!.toString(),
                description: result.entity.description,
                active: result.entity.active,
            });
        } catch (error) {
            return UseCaseResponseUtil.handleResultError(error);
        }
    }
}
