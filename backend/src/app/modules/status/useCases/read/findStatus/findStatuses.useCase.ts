import {inject, injectable} from "tsyringe";
import {IFindStatusesUseCase} from "@status/useCases/read/findStatus/IFindStatuses.useCase";
import {FindStatusesRawDTO, FindStatusesResponseDTO, FilterStatusDTO} from "@status/adapters/dtos/status.dto";
import {ResultType} from "@coreShared/types/result.type";
import {LogExecution} from "@coreShared/decorators/LogExecution";
import {StringUtil} from "@coreShared/utils/string.util";
import {StatusEntity} from "@status/domain/entities/status.entity";
import {FindAllType} from "@coreShared/types/findAll.type";
import {UseCaseResponseError} from "@coreShared/errors/useCaseResponse.error";
import {IStatusService} from "@status/domain/services/interfaces/IStatus.service";

@injectable()
export class FindStatusesUseCase implements IFindStatusesUseCase {
    constructor(
        @inject("IStatusService") private readonly statusService: IStatusService,
    ) {
    }

    @LogExecution()
    async execute(input: FindStatusesRawDTO): Promise<ResultType<FindStatusesResponseDTO>> {
        try {
            const page: number = input.page ? StringUtil.strToNumber(input.page) : 1;
            const limit: number = input.limit ? StringUtil.strToNumber(input.limit) : 20;

            const filter: FilterStatusDTO = {
                id: StringUtil.parseCsvFilter(input.id?.toString(), Number),
                description: StringUtil.parseCsvFilter(input.description?.toString(), String),
                active: StringUtil.parseCsvFilter(input.active?.toString(), StringUtil.parseBoolean),
            };

            const {entities, total}: FindAllType<StatusEntity> = await this.statusService.findMany(filter, page, limit);

            const response: FindStatusesResponseDTO = {
                page,
                limit,
                totalPages: Math.ceil(total / limit),
                data: entities.map(status => ({
                    id: status.id,
                    description: status.description,
                    active: status.active,
                })),
            };

            return ResultType.success(response);
        } catch (error) {
            return UseCaseResponseError.handleResultError(error);
        }
    }
}