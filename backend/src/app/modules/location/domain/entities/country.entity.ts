import {EntityBase} from '@coreShared/base/entity.base';
import {CountryTransformer} from "@location/domain/transformers/country.transform";
import {CountryValidator} from "@location/domain/validators/country.validator";
import {StatusTransformer} from "@status/domain/transformers/Status.transformer";

export interface CountryProps {
    id?: number;
    description: string;
    status: string;
}

export class CountryEntity extends EntityBase<CountryProps> {
    //#region PROPERTIES
    public static readonly MIN_DESC: number = 3;
    public static readonly MAX_DESC: number = 100;
    public static ENTITY_NAME: string = "Country";
    //#endregion

    //#region CONSTRUCTOR
    constructor(props: CountryProps) {
        const normalizedProps: CountryProps = {
            ...props,
            description: CountryTransformer.normalizeDescription(props.description),
            status: StatusTransformer.normalizeDescription(props.status),
        };
        super(normalizedProps);
        this.validateRequiredFields(['description', 'status']);
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

    get status(): string {
        return this.props.status;
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

    //#endregion

    //#region UPDATES
    public update(props: Partial<CountryProps>): this {
        return this.cloneWith(props);
    }

    //#endregion
}
