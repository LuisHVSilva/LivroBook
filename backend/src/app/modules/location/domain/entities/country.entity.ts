import {BaseEntity} from '@coreShared/base/baseEntity';
import {CountryTransformer} from "@location/domain/transformers/country.transform";
import {CountryValidator} from "@location/domain/validators/country.validator";

export interface CountryProps {
    id?: number;
    description: string;
    statusId: number;
}

export class CountryEntity extends BaseEntity<CountryProps> {
    //#region PROPERTIES
    public static readonly MIN_DESC: number = 3;
    public static readonly MAX_DESC: number = 100;
    public static ENTITY_NAME: string = "Country";
    //#endregion

    //#region CONSTRUCTOR
    private constructor(props: CountryProps) {
        const normalizedProps: CountryProps = {
            ...props,
            description: CountryTransformer.normalizeDescription(props.description),
        };
        super(normalizedProps);
        this.validateRequiredFields(['description', 'statusId']);
        this.validate();
    }

    //#endregion

    //#region GET | SET
    get id(): number | undefined {
        return this.props.id;
    }

    get description(): string {
        return this.props.description;
    }

    get statusId(): number {
        return this.props.statusId;
    }

    //#endregion

    //# region VALIDATIONS
    private validate(): void {
        CountryValidator.validateDescriptionLength(this.props.description, CountryEntity.MIN_DESC, CountryEntity.MAX_DESC);
    }

    //#endregion

    //# region CREATION

    public static create(props: CountryProps): CountryEntity {
        return new CountryEntity(props);
    }

    public withProps(props: Partial<CountryProps>): CountryEntity {
        return CountryEntity.create({
            id: this.id,
            description: props.description ?? this.description,
            statusId: props.statusId ?? this.statusId,
        });
    }

    //#endregion

    //#region UPDATES
    public updateProps(props: Partial<CountryProps>): this {
        return this.cloneWith(props);
    }

    //#endregion
}
