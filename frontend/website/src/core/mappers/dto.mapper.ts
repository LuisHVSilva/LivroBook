import {
    type BaseEntityType,
    type DomainClassType,
    EntityDomainBase, type ExtractProps,
} from "../entities/entity.domain.base.ts";
import type {DtoFieldOptions} from "../decorators/domain.decorator.ts";

type DtoFieldMetadata = { key: string } & DtoFieldOptions;
type DtoPropMapType = { prop: string, meta: DtoFieldMetadata };

export class DtoMapper {
    static readonly metadataKey: string = "dtoFields";

    static getDtoFields(target: object): Record<string, DtoFieldMetadata> {
        return (
            Reflect.getMetadata(DtoMapper.metadataKey, target) ??
            Reflect.getMetadata(DtoMapper.metadataKey, target.constructor?.prototype) ??
            {}
        );
    }

    static convertValue(value: unknown, type?: DtoFieldOptions["type"]) {
        if (type === undefined || value === undefined || value === null) return value;

        switch (type) {
            case "string":
                return String(value);
            case "number":
                return Number(value);
            case "boolean":
                if (typeof value === "string") {
                    return value === "true" || value === "1";
                }
                return Boolean(value);
            case "date":
                return new Date(String(value));
            default:
                throw new Error(`Unsupported type "${type}"`);
        }
    }


    /** DTO → Domain */
    static toPartialDomain<TDomain extends EntityDomainBase<unknown & BaseEntityType>>(
        DomainClass: DomainClassType<TDomain>,
        dto: Record<string, unknown>
    ): TDomain {
        const dtoFields: Record<string, DtoFieldMetadata> = this.getDtoFields(DomainClass.prototype);
        const dtoToPropMap: Record<string, DtoPropMapType> = Object.entries(dtoFields).reduce<Record<string, {
            prop: string;
            meta: DtoFieldMetadata
        }>>(
            (acc: Record<string, DtoPropMapType>, [prop, meta]: [string, DtoFieldMetadata]): Record<string, DtoPropMapType> => {
                acc[meta.key] = {prop, meta};
                return acc;
            },
            {}
        );

        const props: Record<string, unknown> = {};

        for (const [key, rawValue] of Object.entries(dto)) {
            let field = dtoToPropMap[key];

            if (!field) {
                const foundKey = Object.keys(dtoToPropMap).find(k => k.endsWith(`.${key}`));
                if (foundKey) field = dtoToPropMap[foundKey];
            }

            if (!field) continue;

            const { prop, meta } = field;
            props[prop] = this.convertValue(rawValue, meta.type);
        }

        return DomainClass.rehydrate(props as ExtractProps<TDomain>);
    }

    /** Domain → DTO */
    static toDTO<TDomain extends EntityDomainBase<unknown & BaseEntityType>, TDTO extends Record<string, unknown>>(
        DomainClass: DomainClassType<TDomain>,
        source: ExtractProps<TDomain> | Partial<ExtractProps<TDomain>>,
    ): TDTO {
        const dtoFields: Record<string, DtoFieldMetadata> = this.getDtoFields(DomainClass.prototype);

        const dto: Record<string, unknown> = {};

        for (const [prop, meta] of this.typedEntries(dtoFields)) {
            if (!meta.send) {
                continue;
            }

            const value = source[prop as keyof typeof source];

            if (value === undefined || value === null) {
                continue;
            }

            const finalValue = this.convertValue(value, meta.type);

            if (meta.key.includes(".")) {
                const [prefix, nestedKey] = meta.key.split(".");

                if (!dto[prefix]) {
                    dto[prefix] = {};
                }

                (dto[prefix] as Record<string, unknown>)[nestedKey] = finalValue;
            } else {
                dto[meta.key] = finalValue;
            }
        }
        return dto as TDTO;
    }

    private static typedEntries<T extends object>(obj: T): [keyof T, T[keyof T]][] {
        return Object.entries(obj) as [keyof T, T[keyof T]][];
    }

}
