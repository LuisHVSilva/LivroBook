import {injectable, inject} from "tsyringe";
import {LogError} from "@coreShared/decorators/LogError";
import {IRepositoryBase} from "@coreShared/base/interfaces/IRepositoryBase";
import {ValidationError} from "@coreShared/errors/domain.error";
import {ResultType} from "@coreShared/types/result.type";
import {BaseRepositoryType} from "@coreShared/types/entity.type";


@injectable()
export class EntityUniquenessValidator<T extends BaseRepositoryType<any, any, any, any, any>> {
    constructor(
        @inject("IRepository") private readonly repository: IRepositoryBase<BaseRepositoryType<T["Model"], T["Entity"], T["Filter"], T["Persistence"], T["NormalizedRelations"]>>
    ) {
    }

    @LogError()
    async validate(
        fieldName: keyof T["Filter"],
        value: unknown,
        previousEntity?: T["Entity"],
        idField: keyof T["Entity"] = "id" as keyof T["Entity"],
        excludeId?: string,
    ): Promise<boolean> {
        const filter = {[fieldName]: value} as T["Filter"];

        if (previousEntity) {
            const isAllSame = Object.entries(filter).every(
                ([key, value]) => previousEntity[key as keyof T["Entity"]] === value
            );
            if (isAllSame) return true;
        }

        const result: ResultType<T["Entity"]> = await this.repository.findOneByFilter(filter, true);

        if (result.isFailure()) {
            throw new ValidationError("Erro ao validar unicidade.");
        }

        const entity: T["Entity"] | null = result.unwrapOrNull();

        return !entity || (excludeId != null && entity?.[idField] === excludeId);
    }

    @LogError()
    async validateFields(
        filter: Partial<T["Filter"]>,
        previousEntity?: T["Entity"],
        idField: keyof T["Entity"] = "id" as keyof T["Entity"],
        excludeId?: string,
    ): Promise<boolean> {

        if (previousEntity) {
            const isAllSame = Object.entries(filter).every(
                ([key, value]) => previousEntity[key as keyof T["Entity"]] === value
            );
            if (isAllSame) return true;
        }

        const result: ResultType<T["Entity"]> = await this.repository.findOneByFilter(filter as T["Filter"]);

        if (result.isFailure()) {
            throw new ValidationError("Erro ao validar unicidade.");
        }

        const entity: T["Entity"] | null = result.unwrapOrNull();

        // 🔹 Ignora o próprio registro (update do mesmo ID)
        const isSameRecord = excludeId != null && entity?.[idField] === excludeId;

        return !entity || isSameRecord;
    }

}
