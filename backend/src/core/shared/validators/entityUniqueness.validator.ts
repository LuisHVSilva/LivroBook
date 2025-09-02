import {injectable, inject} from "tsyringe";
import {LogError} from "@coreShared/decorators/LogError";
import {IRepositoryBase} from "@coreShared/base/interfaces/IRepositoryBase";
import {ValidationError} from "@coreShared/errors/domain.error";
import {ResultType} from "@coreShared/types/result.type";
import {BaseRepositoryType} from "@coreShared/types/entity.type";


@injectable()
export class EntityUniquenessValidator<T extends BaseRepositoryType<any, any, any, any>> {
    constructor(
        @inject("IRepository") private readonly repository: IRepositoryBase<BaseRepositoryType<T["Model"], T["Entity"], T["Filter"], T["Persistence"]>>
    ) {
    }

    @LogError()
    async validate(
        fieldName: keyof T["Filter"],
        value: unknown,
        idField: keyof T["Entity"] = "id" as keyof T["Entity"],
        excludeId?: string
    ): Promise<boolean> {
        const filters = {[fieldName]: value} as T["Filter"];
        const result: ResultType<T["Entity"]> = await this.repository.findOneByFilter(filters);

        if (result.isFailure()) {
            throw new ValidationError("Erro ao validar unicidade.");
        }

        const entity: T["Entity"] | null = result.unwrapOrNull();

        return !entity || (excludeId != null && entity?.[idField] === excludeId);
    }

    @LogError()
    async validateFields(
        fields: Partial<T["Filter"]>,
        idField: keyof T["Entity"] = "id" as keyof T["Entity"],
        excludeId?: string
    ): Promise<boolean> {
        const result = await this.repository.findOneByFilter(fields as T["Filter"]);

        if (result.isFailure()) {
            throw new ValidationError("Erro ao validar unicidade.");
        }

        const entity: T["Entity"] = result.unwrapOrThrow();

        const isSameRecord = excludeId === (entity?.[idField] as unknown as string);

        return !(!isSameRecord);
    }
}
