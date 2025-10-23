import {inject, injectable} from "tsyringe";
import {IFindCountriesUseCase} from "@location/useCases/read/findCountries/IFindCountries.useCase";
import {ICountryService} from "@location/domain/services/interfaces/ICountry.service";
import {CountryFilterDTO, FindCountriesRawDTO, FindCountriesResponseDTO} from "@location/adapters/dtos/country.dto";
import {ResultType} from "@coreShared/types/result.type";
import {StringUtil} from "@coreShared/utils/string.util";
import {FindAllType} from "@coreShared/types/findAll.type";
import {UseCaseResponseError} from "@coreShared/errors/useCaseResponse.error";
import {CountryEntity} from "@location/domain/entities/country.entity";
import {LogError} from "@coreShared/decorators/LogError";

@injectable()
export class FindCountriesUseCase implements IFindCountriesUseCase {
    constructor(
        @inject("ICountryService")
        private readonly service: ICountryService,
    ) {
    }

    @LogError()
    async execute(input: FindCountriesRawDTO): Promise<ResultType<FindCountriesResponseDTO>> {
        try {
            const page: number = input.page ? StringUtil.strToNumber(input.page) : 1;
            const limit: number = input.limit ? StringUtil.strToNumber(input.limit) : 20;

            const filter: CountryFilterDTO = {
                id: StringUtil.parseCsvFilter(input.id?.toString(), Number),
                description: StringUtil.parseCsvFilter(input.description?.toString(), String),
                status: StringUtil.parseCsvFilter(input.status?.toString(), String),
            };

            const {entities, total}: FindAllType<CountryEntity> = await this.service.findMany(filter, page, limit);

            const response: FindCountriesResponseDTO = {
                page,
                limit,
                totalPages: Math.ceil(total / limit),
                data: entities.map(status => ({
                    id: status.id,
                    description: status.description,
                    status: status.status,
                })),
            };

            return ResultType.success(response);
        } catch (error) {
            return UseCaseResponseError.handleResultError(error);
        }
    }
}
