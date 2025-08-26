import {IUseCase} from "@coreShared/interfaces/IUseCase";
import {UpdateCountryDTO} from "@location/adapters/dtos/country.dto";
import {UpdateResultType} from "@coreShared/types/crudResult.type";
import {CountryEntity} from "@location/domain/entities/country.entity";

export interface IUpdateCountryUseCase extends IUseCase<UpdateCountryDTO, UpdateResultType<CountryEntity>> {
}