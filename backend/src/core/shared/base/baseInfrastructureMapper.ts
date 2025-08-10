export abstract class BaseInfrastructureMapper<TDomainEntity, TModel, TPersistenceDTO> {
    /**
     * Maps a domain entity to a persistence DTO.
     * @param entity
     * @return TPersistenceDTO
     */
    abstract toPersistence(entity: TDomainEntity): TPersistenceDTO;

    /**
     * Maps a persistence model to a domain entity.
     * @param model
     * @return TDomainEntity
     */
    abstract toEntity(model: TModel): TDomainEntity;
}