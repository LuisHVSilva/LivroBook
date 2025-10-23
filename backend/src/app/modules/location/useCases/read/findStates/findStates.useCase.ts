import {FindStatesRawDTO, FindStatesResponseDTO, StateFilterDTO} from "@location/adapters/dtos/state.dto";
import {IFindStatesUseCase} from "@location/useCases/read/findStates/IFindStates.useCase";
import {inject, injectable} from "tsyringe";
import {IStateService} from "@location/domain/services/interfaces/IState.service";
import {ResultType} from "@coreShared/types/result.type";
import {StringUtil} from "@coreShared/utils/string.util";
import {FindAllType} from "@coreShared/types/findAll.type";
import {StateEntity} from "@location/domain/entities/state.entity";
import {UseCaseResponseError} from "@coreShared/errors/useCaseResponse.error";
import {LogError} from "@coreShared/decorators/LogError";


@injectable()
export class FindStatesUseCase implements IFindStatesUseCase {
    constructor(
        @inject("IStateService") private readonly service: IStateService,
    ) {
    }

    @LogError()
    async execute(input: FindStatesRawDTO): Promise<ResultType<FindStatesResponseDTO>> {
        try {
            const page: number = input.page ? StringUtil.strToNumber(input.page) : 1;
            const limit: number = input.limit ? StringUtil.strToNumber(input.limit) : 20;

            const {entities, total}: FindAllType<StateEntity> = await this.service.findMany(this.makeFilter(input), page, limit);

            const response: FindStatesResponseDTO = {
                page,
                limit,
                totalPages: Math.ceil(total / limit),
                data: entities,
            };

            return ResultType.success(response);
        } catch (error) {
            return UseCaseResponseError.handleResultError(error);
        }
    }

    private makeFilter(input: FindStatesRawDTO): StateFilterDTO {
        return {
            id: StringUtil.parseCsvFilter(input.id?.toString(), Number),
            description: StringUtil.parseCsvFilter(input.description?.toString(), String),
            country: StringUtil.parseCsvFilter(input.country?.toString(), String),
            status: StringUtil.parseCsvFilter(input.status?.toString(), String),
        };
    }
}
