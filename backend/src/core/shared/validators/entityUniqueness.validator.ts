import {injectable, inject} from "tsyringe";
import {LogError} from "@coreShared/decorators/LogError";
import {IBaseRepository} from "@coreShared/interfaces/IBaseRepository";
import {ValidationError} from "@coreShared/errors/domain.error";
import {ResultType} from "@coreShared/types/result.type";


@injectable()
export class EntityUniquenessValidator<TEntity, TModel, TFilter> {
    constructor(
        @inject("IRepository") private readonly repository: IBaseRepository<TEntity, TModel, TFilter>
    ) {
    }

    @LogError()
    async validate(
        fieldName: keyof TFilter,
        value: unknown,
        idField: keyof TEntity = "id" as keyof TEntity,
        excludeId?: string
    ): Promise<boolean> {
        const filters = {[fieldName]: value} as TFilter;
        const result: ResultType<TEntity> = await this.repository.findOneByFilter(filters);

        if (result.isFailure()) {
            throw new ValidationError("Erro ao validar unicidade.");
        }

        const entity: TEntity | null = result.unwrapOrNull();

        return !entity || (excludeId != null && entity?.[idField] === excludeId);
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
