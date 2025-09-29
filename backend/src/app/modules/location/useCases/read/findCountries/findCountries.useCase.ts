import {inject, injectable} from "tsyringe";
import {IFindCountriesUseCase} from "@location/useCases/read/findCountries/IFindCountries.useCase";
import {ICountryService} from "@location/domain/services/interfaces/ICountry.service";
import {LogExecution} from "@coreShared/decorators/LogExecution";
import {CountryFilterDTO, FindCountriesRawDTO, FindCountriesResponseDTO} from "@location/adapters/dtos/country.dto";
import {ResultType} from "@coreShared/types/result.type";
import {StringUtil} from "@coreShared/utils/string.util";
import {FindAllType} from "@coreShared/types/findAll.type";
import {UseCaseResponseUtil} from "@coreShared/utils/useCaseResponse.util";
import {CountryEntity} from "@location/domain/entities/country.entity";

@injectable()
export class FindCountriesUseCase implements IFindCountriesUseCase {
    constructor(
        @inject("ICountryService") private readonly service: ICountryService,
    ) {
    }

    @LogExecution()
    async execute(input: FindCountriesRawDTO): Promise<ResultType<FindCountriesResponseDTO>> {
        try {
            const page: number = input.page ? StringUtil.strToNumber(input.page) : 1;
            const limit: number = input.limit ? StringUtil.strToNumber(input.limit) : 20;

            const filter: CountryFilterDTO = {
                id: StringUtil.parseCsvFilter(input.id?.toString(), Number),
                description: StringUtil.parseCsvFilter(input.description?.toString(), String),
                statusId: StringUtil.parseCsvFilter(input.statusId?.toString(), Number),
            };

            const {entities, total}: FindAllType<CountryEntity> = await this.service.findMany(filter, page, limit);

            const response: FindCountriesResponseDTO = {
                page,
                limit,
                totalPages: Math.ceil(total / limit),
                data: entities.map(status => ({
                    id: status.id,
                    description: status.description,
                    statusId: status.statusId,
                })),
            };

            return ResultType.success(response);
        } catch (error) {
            return UseCaseResponseUtil.handleResultError(error);
        }
    }
}
