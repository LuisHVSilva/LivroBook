import type {DomainClassType, EntityDomainBase, ExtractProps} from "./entity.domain.base.ts";
import type {EntityRepositoryBase, RepositoryClassType} from "./entity.repository.base.ts";
import type {AllModulesMap} from "../api/endpoints.api.ts";
import type {FindAllProps, FindAllType, FindById} from "../models/types/admin.type.ts";
import {StatusEnum} from "../models/enums/entity.enum.ts";
import {DtoMapper} from "../mappers/dto.mapper.ts";


export abstract class EntityServiceBase<
    TDomain extends EntityDomainBase<any>,
    TRepo extends EntityRepositoryBase<ExtractProps<TDomain>, keyof AllModulesMap>
> {
    static RepositoryClass: RepositoryClassType<any>;
    protected abstract readonly DomainClass: DomainClassType<TDomain>;

    protected get repository(): TRepo {
        const RepoClass = (this.constructor as typeof EntityServiceBase).RepositoryClass as RepositoryClassType<TRepo>;
        return new RepoClass();
    }

    protected mapToDomain(data: ExtractProps<TDomain>): TDomain {
        return this.DomainClass.create(data);
    }

    abstract loadReferenceData(): Promise<Record<string, unknown>>;

    async getById(id: string | number): Promise<FindById<TDomain> | null> {
        if (id === '') {
            throw new Error("Id obrigatório");
        }

        const found: ExtractProps<TDomain> | null = await this.repository.getById(String(id));

        if (!found) {
            return null;
        }

        return this.mapToDomain(found);
    }

    async findAll(filters?: Partial<ExtractProps<TDomain>>, page?: number, limit?: number): Promise<FindAllType<TDomain>> {
        const propsFounded: FindAllProps<ExtractProps<TDomain>> = await this.repository.findAll(filters, page, limit);

        const entityFounded: TDomain[] = propsFounded.data.map((item) =>
            this.mapToDomain(item)
        );

        return {
            ...propsFounded,
            data: entityFounded
        }
    }

    async alter(payload: Record<string, unknown>): Promise<boolean> {
        const id: unknown = payload.id;

        const entity: FindById<TDomain> | null = await this.getById(String(id));

        if (!entity) {
            throw new Error("Entity doesn't exist");
        }

        const alterEntityPayload: TDomain = DtoMapper.toPartialDomain(this.DomainClass, payload);
        const changedEntity: TDomain = entity.change(alterEntityPayload.getProps());
        const changes: Partial<ExtractProps<TDomain>> = changedEntity.getChanges();

        return this.repository.alter(DtoMapper.toDTO(this.DomainClass, changes));
    }

    async delete(id: number | string): Promise<void> {
        return this.repository.delete(id);
    }

    /**
     * Extrai uma lista de propriedades específicas de todas as entidades filtradas.
     * Exemplo:
     *   extractPropertiesList(["id", "name"])
     *   => [{ id: "1", name: "João" }, { id: "2", name: "Maria" }]
     */
    async extractPropertiesList<K extends keyof ExtractProps<TDomain>>(
        props: K | K[],
        isActive: boolean = true
    ): Promise<Pick<ExtractProps<TDomain>, K>[]> {
        const filter = this.makeExtractPropertiesActiveFilter(isActive) as Partial<ExtractProps<TDomain>>;
        const entitiesList = await this.findAll(filter);

        const propsArray = Array.isArray(props) ? props : [props];

        return entitiesList.data.map(entity => {
            const partial = {} as Pick<ExtractProps<TDomain>, K>;
            for (const prop of propsArray) {
                const entityProps = (entity as unknown as { props: ExtractProps<TDomain> }).props;
                partial[prop] = entityProps[prop];
            }
            return partial;
        });
    }

    /**
     * Gera um filtro de busca padrão para entidades ativas ou inativas.
     */
    private makeExtractPropertiesActiveFilter(
        isActive: boolean
    ): Record<string, boolean | string> | null {
        if ((this as any).entityName === "status") {
            return {active: isActive};
        }

        if (isActive) {
            return {status: StatusEnum.ACTIVE};
        }

        return null;
    }

}
