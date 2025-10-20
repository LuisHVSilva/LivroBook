import "reflect-metadata";
import type {EntityDomainBase} from "../../entities/entity.domain.base.ts";

export class DomainDecoratorUtil {
    static getLabels(entity: unknown & EntityDomainBase<any>): Record<string, string> {
        return (Reflect.getMetadata("labels", Object.getPrototypeOf(entity))) ?? {}
    }

}