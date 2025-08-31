import {
    CountryBaseRepositoryType,
    ICountryRepository
} from "@location/infrastructure/repositories/interfaces/ICountry.repository";
import {inject, injectable} from "tsyringe";
import {ModelStatic} from "sequelize";
import {CountryEntity} from "@location/domain/entities/country.entity";
import {CountryModel} from "@location/infrastructure/models/country.model";
import {CountryFilterDTO, CountryPersistenceDTO} from "@location/adapters/dtos/country.dto";
import {SequelizeWhereBuilderUtil} from "@coreShared/utils/sequelizeWhereBuilder.util";

import {RepositoryBase} from "@coreShared/base/repository.base";

@injectable()
export class CountryRepository extends RepositoryBase<CountryBaseRepositoryType> implements ICountryRepository {
    constructor(
        @inject("CountryModel") model: ModelStatic<CountryModel>,
    ) {
        super(model);
    }

    protected makeFilter(filters?: CountryFilterDTO): SequelizeWhereBuilderUtil<CountryFilterDTO> {
        return super.makeFilter(filters, {
            id: {in: true},
            description: {like: true},
            statusId: {in: true},
        });
    }

    protected toPersistence(entity: CountryEntity): CountryPersistenceDTO {
        return {
            description: entity.description,
            statusId: entity.statusId,
        };
    }

    protected toEntity(model: CountryModel): CountryEntity {
        return CountryEntity.create({
            id: model.id,
            description: model.description,
            statusId: model.statusId,
        });
    }
}