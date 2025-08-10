import {inject, injectable} from "tsyringe";
import {IFindLocationsUseCase} from "@location/useCases/findLocations/IFindLocations.useCase";
import {LogExecution} from "@coreShared/decorators/LogExecution";
import {GetLocationsDTO, GetLocationsResponseDTO, LocationFilterDTO} from "@location/adapters/dtos/location.dto";
import {ResultType} from "@coreShared/types/result.type";
import {NotFoundError} from "@coreShared/errors/domain.error";
import {EntitiesMessage} from "@coreShared/messages/entities.message";
import {UseCaseResponseUtil} from "@coreShared/utils/useCaseResponse.util";
import {StringUtil} from "@coreShared/utils/string.util";
import {CountryEntity} from "@location/domain/entities/country.entity";
import {StateEntity} from "@location/domain/entities/state.entity";
import {CityEntity} from "@location/domain/entities/city.entity";
import {ICountryService} from "@location/domain/services/interfaces/ICountry.service";
import {IStateService} from "@location/domain/services/interfaces/IState.service";
import {ICityService} from "@location/domain/services/interfaces/ICity.service";


interface FilterResult {
    countries: CountryEntity[];
    states: StateEntity[];
    cities: CityEntity[];
}

@injectable()
export class FindLocationsUseCase implements IFindLocationsUseCase {
    constructor(
        @inject("ICountryService") private readonly countryService: ICountryService,
        @inject("IStateService") private readonly stateService: IStateService,
        @inject("ICityService") private readonly cityService: ICityService,
    ) {
    }

    private readonly notFoundError = new NotFoundError(EntitiesMessage.error.retrieval.notFoundGeneric);

    @LogExecution()
    async execute(input: GetLocationsDTO): Promise<ResultType<GetLocationsResponseDTO>> {
        try {
            const filter: LocationFilterDTO = this.mapLocationFilter(input);
            const page: number = input.page ? StringUtil.strToNumber(input.page) : 1;
            const limit: number = input.limit ? StringUtil.strToNumber(input.limit) : 20;

            const result: FilterResult = await this.resolveStrategy(filter, page, limit);

            if (result.countries.length === 0 || result.states.length === 0 || result.cities.length === 0) {
                return ResultType.failure(this.notFoundError);
            }

            const response: GetLocationsResponseDTO = {
                page,
                limit,
                totalPages: 1,
                data: this.mapResult(input.entities, result),
            };

            return ResultType.success(response);
        } catch (error) {
            return UseCaseResponseUtil.handleResultError(error);
        }
    }

    private mapLocationFilter(input: GetLocationsDTO): LocationFilterDTO {
        return {
            countriesId: StringUtil.parseCsvFilter(input.countriesId?.toString(), Number),
            statesId: StringUtil.parseCsvFilter(input.statesId?.toString(), Number),
            citiesId: StringUtil.parseCsvFilter(input.citiesId?.toString(), Number),
        };
    }


    private async resolveStrategy(filter: LocationFilterDTO, page: number, limit: number): Promise<FilterResult> {
        const has = {
            countries: filter.countriesId?.length,
            states: filter.statesId?.length,
            cities: filter.citiesId?.length,
        };

        if (has.countries && !has.states && !has.cities) return this.filterByCountry(filter, page, limit);
        if (has.countries && has.states && !has.cities) return this.filterByCountryAndState(filter, page, limit);
        if (has.countries && !has.states && has.cities) return this.filterByCountryAndCity(filter, page, limit);
        if (!has.countries && has.states && !has.cities) return this.filterByState(filter, page, limit);
        if (!has.countries && has.states && has.cities) return this.filterByStateAndCity(filter, page, limit);
        if (!has.countries && !has.states && has.cities) return this.filterByCity(filter, page, limit);

        return this.filterByAny(page, limit);
    }

    private async getEntities<T>(
        service: { getAll: (filter: any, page: number, limit: number) => Promise<{ entities: T[] }> },
        filter: object,
        page: number,
        limit: number
    ): Promise<T[]> {
        return (await service.getAll(filter, page, limit)).entities;
    }

    private async filterByCountry(filter: LocationFilterDTO, page: number, limit: number): Promise<FilterResult> {
        const countries = await this.getEntities(this.countryService, {
            id: filter.countriesId,
        }, page, limit);

        const states = await this.getEntities(this.stateService, {
            countryId: filter.countriesId,
        }, page, limit);

        const cities = await this.getEntities(this.cityService, {
            stateId: states.map(s => s.id).filter((id): id is number => !!id),
        }, page, limit);

        return {countries, states, cities};
    }

    private async filterByCountryAndState(filter: LocationFilterDTO, page: number, limit: number): Promise<FilterResult> {
        const countries = await this.getEntities(this.countryService, {
            id: filter.countriesId,
        }, page, limit);

        const states = await this.getEntities(this.stateService, {
            id: filter.statesId,
            countryId: filter.countriesId,
        }, page, limit);

        const cities = await this.getEntities(this.cityService, {
            stateId: states.map(s => s.id).filter((id): id is number => !!id),
        }, page, limit);

        return {countries, states, cities};
    }

    private async filterByCountryAndCity(filter: LocationFilterDTO, page: number, limit: number): Promise<FilterResult> {
        const countries = await this.getEntities(this.countryService, {
            id: filter.countriesId,
        }, page, limit);

        const cities = await this.getEntities(this.cityService, {
            id: filter.citiesId,
        }, page, limit);

        const states = await this.getEntities(this.stateService, {
            id: cities.map(c => c.stateId),
            countryId: countries.map(c => c.id).filter((id): id is number => !!id),
        }, page, limit);

        return {countries, states, cities};
    }

    private async filterByState(filter: LocationFilterDTO, page: number, limit: number): Promise<FilterResult> {
        const states = await this.getEntities(this.stateService, {
            id: filter.statesId,
        }, page, limit);

        const countries = await this.getEntities(this.countryService, {
            id: states.map(s => s.countryId),
        }, page, limit);

        const cities = await this.getEntities(this.cityService, {
            stateId: states.map(s => s.id).filter((id): id is number => !!id),
        }, page, limit);

        return {countries, states, cities};
    }

    private async filterByStateAndCity(filter: LocationFilterDTO, page: number, limit: number): Promise<FilterResult> {
        const states = await this.getEntities(this.stateService, {
            id: filter.statesId,
        }, page, limit);

        const countries = await this.getEntities(this.countryService, {
            id: states.map(s => s.countryId),
        }, page, limit);

        const cities = await this.getEntities(this.cityService, {
            id: filter.citiesId,
            stateId: states.map(s => s.id).filter((id): id is number => !!id),
        }, page, limit);

        return {countries, states, cities};
    }

    private async filterByCity(filter: LocationFilterDTO, page: number, limit: number): Promise<FilterResult> {
        const cities = await this.getEntities(this.cityService, {
            id: filter.citiesId,
        }, page, limit);

        const states = await this.getEntities(this.stateService, {
            id: cities.map(c => c.stateId),
        }, page, limit);

        const countries = await this.getEntities(this.countryService, {
            id: states.map(s => s.countryId),
        }, page, limit);

        return {countries, states, cities};
    }

    private async filterByAny(page: number, limit: number): Promise<FilterResult> {
        const countries = await this.getEntities(this.countryService, {}, page, limit);

        const states = await this.getEntities(this.stateService, {
            countryId: countries.map(c => c.id).filter((id): id is number => !!id),
        }, page, limit);

        const cities = await this.getEntities(this.cityService, {
            stateId: states.map(s => s.id).filter((id): id is number => !!id),
        }, page, limit);

        return {countries, states, cities};
    }

    private mapResult(inputEntities: string[] | undefined, result: FilterResult): GetLocationsResponseDTO["data"] {
        let data: Partial<GetLocationsResponseDTO['data']> = {};

        if (inputEntities) {
            const entities: string[] | undefined = StringUtil.parseCsvFilter(inputEntities.toString(), String);

            if (entities) {
                for (const entity of entities) {
                    if (entity === 'country') {
                        data.countries = result.countries;
                    } else if (entity === 'state') {
                        data.states = result.states;
                    } else if (entity === 'city') {
                        data.cities = result.cities;
                    }
                }
            }
        } else {
            data = result;
        }

        return data as GetLocationsResponseDTO["data"];
    }
}
