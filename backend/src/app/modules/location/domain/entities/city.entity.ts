import {EntityBase} from "@coreShared/base/entity.base";
import {CityTransformer} from "@location/domain/transformers/city.transform";
import {CityValidator} from "@location/domain/validators/city.validator";
import {StateTransformer} from "@location/domain/transformers/state.transform";
import {StatusTransformer} from "@status/domain/transformers/Status.transformer";

export interface CityProps {
    id?: number;
    description: string;
    state: string;
    status: string;
}

export class CityEntity extends EntityBase<CityProps> {
    //#region PROPERTIES
    public static readonly MIN_DESC: number = 3;
    public static readonly MAX_DESC: number = 250;
    public static readonly ENTITY_NAME: string = "CITY";
    //#endregion

    //#region CONSTRUCTOR
    constructor(props: CityProps) {
        const normalizedProps: CityProps = {
            ...props,
            description: CityTransformer.normalizeDescription(props.description),
            state: StateTransformer.normalizeDescription(props.state),
            status: StatusTransformer.normalizeDescription(props.status),
        };
        super(normalizedProps);

        this.validateRequiredFields(['description', 'state', 'status']);
        this.validate();
    }

    //#endregion

    //#region GET
    get id(): number | undefined {
        return this.props.id;
    }

    get description(): string {
        return this.props.description;
    }

    get state(): string {
        return this.props.state;
    }

    get status(): string {
        return this.props.status;
    }

    //#endregion

    //#region VALIDATIONS
    private validate(): void {
        CityValidator.validateDescriptionLength(this.props.description, CityEntity.MIN_DESC, CityEntity.MAX_DESC);
    }

    //#endregion

    //#region CREATION
    public static create(props: CityProps): CityEntity {
        return new CityEntity(props);
    }

    //#endregion

    //#region UPDATES
    public update(props: Partial<CityProps>): this {
        return this.cloneWith(props);
    }

    //#endregion
}