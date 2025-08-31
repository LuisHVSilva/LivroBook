import {inject, injectable} from "tsyringe";
import {
    IStateRepository,
    StateBaseRepositoryType
} from "@location/infrastructure/repositories/interfaces/IState.repository";
import {ModelStatic} from "sequelize";
import {StateEntity} from "@location/domain/entities/state.entity";
import {StateModel} from "@location/infrastructure/models/state.model";
import {StateFilterDTO, StatePersistenceDTO} from "@location/adapters/dtos/state.dto";
import {SequelizeWhereBuilderUtil} from "@coreShared/utils/sequelizeWhereBuilder.util";
import {RepositoryBase} from "@coreShared/base/repository.base";


@injectable()
export class StateRepository extends RepositoryBase<StateBaseRepositoryType> implements IStateRepository {
    constructor(
        @inject("StateModel") model: ModelStatic<StateModel>
    ) {
        super(model);
    }

    protected makeFilter(filters?: StateFilterDTO): SequelizeWhereBuilderUtil<StateFilterDTO> {
        return super.makeFilter(filters, {
            id: {in: true},
            description: {like: true},
            countryId: {in: true},
            statusId: {in: true},
        });
    }

    protected toPersistence(entity: StateEntity): StatePersistenceDTO {
        return {
            description: entity.description,
            statusId: entity.statusId,
            countryId: entity.countryId
        };
    }

    protected toEntity(model: StateModel): StateEntity {
        return StateEntity.create({
            id: model.id,
            description: model.description,
            statusId: model.statusId,
            countryId: model.countryId
        });
    }

}