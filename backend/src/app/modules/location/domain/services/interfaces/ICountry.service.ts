import {CountryFilterDTO, CreateCountryDTO, UpdateCountryDTO} from "@location/adapters/dtos/country.dto";
import {Transaction} from "sequelize";
import {UpdateResultType} from "@coreShared/types/crudResult.type";
import {CountryEntity} from "@location/domain/entities/country.entity";
import {FindAllType} from "@coreShared/types/findAll.type";
import {DeleteStatusEnum} from "@coreShared/enums/deleteStatus.enum";
import {DeleteReport} from "@coreShared/utils/operationReport.util";

export interface ICountryService {
    create(data: CreateCountryDTO, transaction: Transaction): Promise<CountryEntity>;

    getById(id: number): Promise<CountryEntity>;

    findMany(filter?: CountryFilterDTO, page?: number, limit?: number): Promise<FindAllType<CountryEntity>>;

    update(newData: UpdateCountryDTO, transaction: Transaction): Promise<UpdateResultType<CountryEntity>>;

    delete(id: number, transaction: Transaction): Promise<DeleteStatusEnum>;

    deleteMany(ids: number[], transaction: Transaction): Promise<DeleteReport>;
}
