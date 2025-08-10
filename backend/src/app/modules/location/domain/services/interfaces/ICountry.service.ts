import {CountryDTO, CountryFilterDTO} from "@location/adapters/dtos/country.dto";
import {Transaction} from "sequelize";
import {CreateResultType, UpdateResultType} from "@coreShared/types/crudResult.type";
import {CountryEntity} from "@location/domain/entities/country.entity";
import {FindAllType} from "@coreShared/types/findAll.type";

export interface ICountryService {
    createOrGetCountry(description: string, transaction: Transaction): Promise<CreateResultType<CountryEntity>>;
    get(filter: CountryFilterDTO): Promise<CountryEntity | null>;
    getById(id: number): Promise<CountryEntity | null>;
    getAll(filter?: CountryFilterDTO, page?: number, limit?: number): Promise<FindAllType<CountryEntity>>;
    updateProperties(currentCountry: CountryEntity, properties: CountryDTO, transaction: Transaction): Promise<UpdateResultType<CountryEntity>>;
    deleteCountry(id: number, transaction: Transaction): Promise<void>;
}
