import { Op, WhereOptions } from 'sequelize';

interface FieldConfig {
    in?: boolean;
    like?: boolean;
}

type Config<T> = Partial<Record<keyof T, FieldConfig>>;

export class SequelizeWhereBuilderUtil<T extends Record<string, any>> {
    private readonly filters?: Partial<T>;
    private readonly config: Config<T>;

    constructor(filters?: Partial<T>, config?: Config<T>) {
        this.filters = filters;
        this.config = config ?? {};
    }

    public build(): WhereOptions {
        const where: WhereOptions = {};

        if (!this.filters) return where;

        for (const key in this.filters) {
            const value = this.filters[key];
            if (value == null) continue;

            const fieldCfg = this.config[key as keyof T] ?? {};

            if (Array.isArray(value) && fieldCfg.in) {
                where[key] = { [Op.in]: value };
            } else if (typeof value === 'string' && fieldCfg.like) {
                where[key] = { [Op.iLike]: `%${value}%` };
            } else {
                where[key] = value;
            }
        }

        return where;
    }
}
