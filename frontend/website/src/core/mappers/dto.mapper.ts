import {
    type BaseEntityType,
    type DomainClassType,
    EntityDomainBase, type ExtractProps,
} from "../entities/entity.domain.base.ts";
import type {DtoFieldOptions} from "../decorators/domain.decorator.ts";
import {DomainDecoratorUtil} from "../utils/decorators/domain.decorator.util.ts";
import type {EntityDtoInfos} from "../models/types/admin.type.ts";

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

            const {prop, meta} = field;
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

    static fieldsInfos<TDomain extends EntityDomainBase<unknown & BaseEntityType>>(
        DomainClass: TDomain,
        excludeId: boolean = false,
        includeLabel: boolean = true,
    ): EntityDtoInfos[] {
        const labels: Record<string, string> | undefined = includeLabel ? DomainDecoratorUtil.getLabels(DomainClass) : undefined;
        const dtoFields: DtoFieldOptions = DtoMapper.getDtoFields(DomainClass);

        const entityAllDtoInfos: EntityDtoInfos[] = Object.entries(dtoFields).map(([key, value]) => {
            const basicResult = {
                [key]: {
                    ...value
                }
            }

            if (includeLabel) {
                basicResult[key]["label"] = labels ? labels[key] : key;
            }

            return basicResult;
        })

        if (excludeId) {
            return entityAllDtoInfos
                .map(item => Object.fromEntries(Object.entries(item).filter(([k]) => k !== 'id')))
                .filter(item => Object.keys(item).length > 0);
        }

        return entityAllDtoInfos;
    }

    private static typedEntries<T extends object>(obj: T): [keyof T, T[keyof T]][] {
        return Object.entries(obj) as [keyof T, T[keyof T]][];
    }

}
