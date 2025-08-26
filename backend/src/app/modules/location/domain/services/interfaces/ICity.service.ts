import {CityFilterDTO, CreateCityDTO, UpdateCityDTO} from "@location/adapters/dtos/city.dto";
import {Transaction} from "sequelize";
import {UpdateResultType} from "@coreShared/types/crudResult.type";
import {CityEntity} from "@location/domain/entities/city.entity";
import {FindAllType} from "@coreShared/types/findAll.type";
import {DeleteStatusEnum} from "@coreShared/enums/deleteStatus.enum";
import {DeleteReport} from "@coreShared/utils/operationReport.util";

export interface ICityService {
    create(data: CreateCityDTO, transaction: Transaction): Promise<CityEntity>;

    getById(id: number): Promise<CityEntity>;

    findMany(filter: CityFilterDTO, page?: number, limit?: number): Promise<FindAllType<CityEntity>>;

    update(newData: UpdateCityDTO, transaction: Transaction): Promise<UpdateResultType<CityEntity>>;

    delete(id: number, transaction: Transaction): Promise<DeleteStatusEnum>;

    deleteMany(ids: number[], transaction: Transaction): Promise<DeleteReport>;
}