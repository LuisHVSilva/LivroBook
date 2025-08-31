export abstract class EntityBase<T extends { id?: unknown }> {
    protected readonly props: T;

    protected constructor(props: T) {
        this.props = Object.freeze({ ...props }); // Protege contra mutação
    }

    public getProps(): T {
        return this.props;
    }

    protected validateRequiredFields(fields: (keyof T)[]): void {
        for (const field of fields) {
            const value = this.getProps()[field]; // <-- pegando dos props corretos

            const isEmptyString = typeof value === 'string' && value.trim() === '';
            const isNullOrUndefined = value === null || value === undefined;

            if (isEmptyString || isNullOrUndefined) {
                throw new Error(`Field "${String(field)}" is required.`);
            }
        }
    }

    protected cloneWith(overrides: Partial<T>): this {
        const mergedProps = { ...this.props, ...overrides };
        return new (this.constructor as any)(mergedProps);
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
            .filter(key => key !== "statusId")
            .some(key => this.props[key] !== other.props[key]);
    }

    abstract update(props: Partial<T>): this;
}
