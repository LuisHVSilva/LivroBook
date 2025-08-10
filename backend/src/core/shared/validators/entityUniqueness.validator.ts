import { injectable, inject } from "tsyringe";
import {LogError} from "@coreShared/decorators/LogError";
import {IBaseRepository} from "@coreShared/interfaces/IBaseRepository";
import {ValidationError} from "@coreShared/errors/domain.error";


@injectable()
export class EntityUniquenessValidator<TEntity, TModel, TFilter> {
    private readonly LIMIT: number = 1;
    private readonly OFFSET: number = 0;

    constructor(
        @inject("IRepository") private readonly repository: IBaseRepository<TEntity, TModel, TFilter>
    ) {}

    @LogError()
    async validate(
        fieldName: keyof TFilter,
        value: unknown,
        idField: keyof TEntity = "id" as keyof TEntity,
        excludeId?: string
    ): Promise<boolean> {
        const filters = { [fieldName]: value } as TFilter;
        const result = await this.repository.findMany(this.LIMIT, this.OFFSET, filters);

        if (result.isFailure()) {
            throw new ValidationError("Erro ao validar unicidade.");
        }

        const { entities, total } = result.unwrapOrThrow();

        const entity = entities[0];
        const isSameRecord = total > 0 && excludeId === (entity?.[idField] as unknown as string);

        return !(total > 0 && !isSameRecord);
    }

    @LogError()
    async validateFields(
        fields: Partial<TFilter>,
        idField: keyof TEntity = "id" as keyof TEntity,
        excludeId?: string
    ): Promise<boolean> {
        const result = await this.repository.findOneByFilter(fields as TFilter);

        if (result.isFailure()) {
            throw new ValidationError("Erro ao validar unicidade.");
        }

        const entity: TEntity = result.unwrapOrThrow();

        const isSameRecord = excludeId === (entity?.[idField] as unknown as string);

        return !(!isSameRecord);
    }
}
