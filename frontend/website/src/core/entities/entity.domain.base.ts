// domain.entity.ts
import "reflect-metadata";
import {Domain} from "../decorators/domain.decorator.ts";

export type BaseEntityType = {
    id?: number;
}

export type ExtractProps<TDomain> = TDomain extends EntityDomainBase<infer TProps> ? TProps : never;

export type DomainClassType<TDomain extends EntityDomainBase<unknown & BaseEntityType>> = {
    create(props: ExtractProps<TDomain>): TDomain;
    rehydrate(partialProps: Partial<ExtractProps<TDomain>>): TDomain;
    new(props: ExtractProps<TDomain>): TDomain;
};

@Domain()
export abstract class EntityDomainBase<TProps extends BaseEntityType> {

    protected static readonly metadataKey = "dtoFields";
    protected readonly props: Readonly<TProps>;
    private readonly originalProps: Readonly<TProps>;

    constructor(props: TProps, originalProps?: TProps) {
        this.props = Object.freeze({ ...props });
        this.originalProps = Object.freeze({ ...(originalProps ?? props) });
    }

    public static create<T extends EntityDomainBase<P>, P extends object>(
        this: new (props: P) => T,
        props: P
    ): T {
        return new this(props);
    }

    public static rehydrate<T extends EntityDomainBase<P>, P extends object>(
        this: new (props: P) => T,
        props: Partial<P>
    ): T {
        return new this(props as P);
    }

    public getProps(): Readonly<TProps> {
        return this.props;
    }

    public hasId(): boolean {
        return this.props.id !== undefined;
    }

    public change(props: Partial<TProps>): this {
        const merged = {...this.props, ...props} as TProps;
        return new (this.constructor as new (props: TProps, originalProps: TProps) => this)(
            merged,
            this.originalProps as TProps
        );
    }

    public static getFields(): string[] {
        return Reflect.getMetadata(this.metadataKey, this) ?? [];
    }

    public getChanges(includeId: boolean = true): Partial<TProps> {
        const changes: Partial<TProps> = {};

        for (const key of Object.keys(this.props) as (keyof TProps)[]) {
            if (this.props[key] !== this.originalProps[key]) {
                changes[key] = this.props[key];
            }
        }

        if (includeId) {
            if (!this.hasId()) {
                throw new Error(
                    `Cannot get changes from entity without ID: ${JSON.stringify(changes)}`
                );
            }
            return { id: this.props.id, ...changes };
        }

        return changes;
    }
}
