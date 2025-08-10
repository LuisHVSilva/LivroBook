export abstract class BaseEntity<T extends { id?: unknown }> {
    protected readonly props: T;

    protected constructor(props: T) {
        this.props = Object.freeze({ ...props }); // Protege contra mutação
    }

    private getId(): unknown {
        return this.props.id;
    }

    public hasId(): boolean {
        return this.getId() !== undefined && this.getId() !== null;
    }

    public getProps(): T {
        return this.props;
    }

    public toJSON(): Record<string, unknown> {
        return {...this.props};
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
}
