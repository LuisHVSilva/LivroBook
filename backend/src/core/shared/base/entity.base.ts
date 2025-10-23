import {ValidationError} from "@coreShared/errors/classes.error";


export abstract class EntityBase<T extends { id?: unknown }> {
    protected readonly props: T;

    protected constructor(props: T) {
        this.props = Object.freeze({...props}); // Protege contra mutação
    }

    abstract update(props: Partial<T>): this;

    public getProps(): T {
        return this.props;
    }

    public toObject(): T {
        return {...this.props};
    }

    public toJSON(): T {
        return this.toObject();
    }

    public isEqual(other: EntityBase<T>, excludeKeys: (keyof T)[] = ["id"]): boolean {
        const keys = Object.keys(this.props) as (keyof T)[];
        return keys
            .filter(key => !excludeKeys.includes(key))
            .every(key => this.props[key] === other.props[key]);
    }

    public hasDifferencesExceptStatus(other: EntityBase<T>): boolean {
        const keys = Object.keys(this.props) as (keyof T)[];
        return keys
            .filter(key => key !== "status")
            .some(key => {
                if (key === "id") {
                    return this.props[key] != other.props[key]
                }
                return this.props[key] !== other.props[key]
            });
    }

    protected validateRequiredFields(fields: (keyof T)[]): void {
        for (const field of fields) {
            const value = this.getProps()[field];

            const isEmptyString = typeof value === 'string' && value.trim() === '';
            const isNullOrUndefined = value === null || value === undefined;

            if (isEmptyString || isNullOrUndefined) {
                throw new ValidationError(`Field "${String(field)}" is required.`);
            }
        }
    }

    protected cloneWith(overrides: Partial<T>): this {
        const mergedProps = {...this.props, ...overrides};
        return new (this.constructor as any)(mergedProps);
    }

    protected deepMerge<U extends Record<string, any>>(target: U, source: Partial<U>): U {
        const result: Record<string, any> = { ...target };

        for (const [k, v] of Object.entries(source) as [keyof U, any][]) {
            const key = k as string;

            const value = v;

            const current = result[key];

            if (
                value &&
                typeof value === "object" &&
                !Array.isArray(value) &&
                current &&
                typeof current === "object" &&
                !Array.isArray(current)
            ) {
                result[key] = this.deepMerge(current as any, value as any);
            } else {
                result[key] = value;
            }
        }

        return result as U;
    }
}
