import { WhereOptions, Op } from "sequelize";

export type FilterMode = 'exact' | 'partial';
type AssociationMap<T> = Partial<Record<keyof T, string>>;


export class SequelizeWhereBuilderUtil<TFilter> {
    private readonly filters?: TFilter;
    private readonly config?: Partial<Record<keyof TFilter, { in?: boolean; like?: boolean }>>;
    private readonly mode: FilterMode;

    constructor(
        filters?: TFilter,
        config?: Partial<Record<keyof TFilter, { in?: boolean; like?: boolean }>>,
        mode: FilterMode = 'partial'
    ) {
        this.filters = filters;
        this.config = config;
        this.mode = mode;
    }

    build(associationMap?: AssociationMap<TFilter>): WhereOptions {
        const where: WhereOptions = {};
        if (!this.filters) return where;

        Object.entries(this.filters).forEach(([key, rawValue]) => {
            if (rawValue === undefined || rawValue === null) return;

            const fieldConfig = this.config?.[key as keyof TFilter];
            const value = Array.isArray(rawValue) ? rawValue : [rawValue];

            // Verifica se o campo é de associação
            const fieldKey = associationMap?.[key as keyof TFilter]
                ? `$${associationMap[key as keyof TFilter]}$`
                : key;

            // Modo exato
            if (this.mode === 'exact') {
                where[fieldKey] = Array.isArray(rawValue) ? { [Op.in]: rawValue } : rawValue;
                return;
            }

            // Modo parcial
            if (fieldConfig?.in || Array.isArray(rawValue)) {
                where[fieldKey] = { [Op.in]: value };
            } else if (fieldConfig?.like && typeof rawValue === 'string') {
                where[fieldKey] = { [Op.iLike]: `%${rawValue}%` };
            } else {
                where[fieldKey] = rawValue;
            }
        });

        return where;
    }

}
