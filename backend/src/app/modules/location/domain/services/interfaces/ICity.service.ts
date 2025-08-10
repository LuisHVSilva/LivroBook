import {CityCreateDTO, CityDTO, CityFilterDTO} from "@location/adapters/dtos/city.dto";
import {Transaction} from "sequelize";
import {CreateResultType, UpdateResultType} from "@coreShared/types/crudResult.type";
import {CityEntity} from "@location/domain/entities/city.entity";
import {FindAllType} from "@coreShared/types/findAll.type";

export interface ICityService {
    createOrGetCity(data: CityCreateDTO, transaction: Transaction): Promise<CreateResultType<CityEntity>>
    get(filter: CityFilterDTO): Promise<CityEntity | null>
    getById(id: number): Promise<CityEntity | null>
    getAll(filter: CityFilterDTO, page?: number, limit?: number): Promise<FindAllType<CityEntity>>
    updateProperties(currentCity: CityEntity, properties: CityDTO, transaction: Transaction): Promise<UpdateResultType<CityEntity>>
    deleteCity(id: number, transaction: Transaction): Promise<void>
}