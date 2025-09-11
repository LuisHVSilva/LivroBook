import {FindStatesRawDTO, FindStatesResponseDTO, StateFilterDTO} from "@location/adapters/dtos/state.dto";
import {IFindStatesUseCase} from "@location/useCases/findStates/IFindStates.useCase";
import {inject, injectable} from "tsyringe";
import {IStateService} from "@location/domain/services/interfaces/IState.service";
import {LogExecution} from "@coreShared/decorators/LogExecution";
import {ResultType} from "@coreShared/types/result.type";
import {StringUtil} from "@coreShared/utils/string.util";
import {FindAllType} from "@coreShared/types/findAll.type";
import {StateEntity} from "@location/domain/entities/state.entity";
import {UseCaseResponseUtil} from "@coreShared/utils/useCaseResponse.util";


@injectable()
export class FindStatesUseCase implements IFindStatesUseCase {
    constructor(
        @inject("IStateService") private readonly service: IStateService,
    ) {
    }

    @LogExecution()
    async execute(input: FindStatesRawDTO): Promise<ResultType<FindStatesResponseDTO>> {
        try {
            const page: number = input.page ? StringUtil.strToNumber(input.page) : 1;
            const limit: number = input.limit ? StringUtil.strToNumber(input.limit) : 20;

            const filter: StateFilterDTO = {
                id: StringUtil.parseCsvFilter(input.id?.toString(), Number),
                description: StringUtil.parseCsvFilter(input.description?.toString(), String),
                countryId: StringUtil.parseCsvFilter(input.countryId?.toString(), Number),
                statusId: StringUtil.parseCsvFilter(input.statusId?.toString(), Number),
            };

            const {entities, total}: FindAllType<StateEntity> = await this.service.findMany(filter, page, limit);

            const response: FindStatesResponseDTO = {
                page,
                limit,
                totalPages: Math.ceil(total / limit),
                data: entities,
            };

            return ResultType.success(response);
        } catch (error) {
            return UseCaseResponseUtil.handleResultError(error);
        }
    }
}
