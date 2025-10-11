import {inject, injectable} from "tsyringe";
import {ResultType} from "@coreShared/types/result.type";
import {StringUtil} from "@coreShared/utils/string.util";
import {FindAllType} from "@coreShared/types/findAll.type";
import {UseCaseResponseUtil} from "@coreShared/utils/useCaseResponse.util";
import {IFindCitiesUseCase} from "@location/useCases/read/findCities/IFindCities.useCase";
import {CityFilterDTO, FindCitiesRawDTO, FindCitiesResponseDTO} from "@location/adapters/dtos/city.dto";
import {ICityService} from "@location/domain/services/interfaces/ICity.service";
import {CityEntity} from "@location/domain/entities/city.entity";
import {LogError} from "@coreShared/decorators/LogError";


@injectable()
export class FindCitiesUseCase implements IFindCitiesUseCase {
    constructor(
        @inject("ICityService") private readonly service: ICityService,
    ) {
    }

    @LogError()
    async execute(input: FindCitiesRawDTO): Promise<ResultType<FindCitiesResponseDTO>> {
        try {
            const page: number = input.page ? StringUtil.strToNumber(input.page) : 1;
            const limit: number = input.limit ? StringUtil.strToNumber(input.limit) : 20;

            const filter: CityFilterDTO = {
                id: StringUtil.parseCsvFilter(input.id?.toString(), Number),
                description: StringUtil.parseCsvFilter(input.description?.toString(), String),
                state: StringUtil.parseCsvFilter(input.state?.toString(), String),
                status: StringUtil.parseCsvFilter(input.status?.toString(), String),
            };

            const {entities, total}: FindAllType<CityEntity> = await this.service.findMany(filter, page, limit);

            const response: FindCitiesResponseDTO = {
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
