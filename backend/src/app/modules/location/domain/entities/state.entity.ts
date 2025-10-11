import {EntityBase} from "@coreShared/base/entity.base";
import {StateTransformer} from "@location/domain/transformers/state.transform";
import {StateValidator} from "@location/domain/validators/state.validator";
import {CountryTransformer} from "@location/domain/transformers/country.transform";
import {StatusTransformer} from "@status/domain/transformers/Status.transformer";

export interface StateProps {
    id?: number;
    description: string;
    country: string;
    status: string;
}

export class StateEntity extends EntityBase<StateProps> {
    //#region PROPERTIES
    public static readonly MIN_DESC: number = 3;
    public static readonly MAX_DESC: number = 100;
    public static readonly ENTITY_NAME: string = "State";
    //#endregion

    //#region CONSTRUCTOR
    constructor(props: StateProps) {
        const normalizedProps: StateProps = {
            ...props,
            description: StateTransformer.normalizeDescription(props.description),
            country: CountryTransformer.normalizeDescription(props.country),
            status: StatusTransformer.normalizeDescription(props.status),
        };
        super(normalizedProps);
        this.validateRequiredFields(['description', 'country', 'status']);
        this.validate();
    }

    //#endregion

    //#region GETTERS
    get id(): number | undefined {
        return this.props.id;
    }

    get description(): string {
        return this.props.description;
    }

    get country(): string {
        return this.props.country;
    }

    get status(): string {
        return this.props.status;
    }

    //#endregion

    //#region VALIDATIONS
    private validate(): void {
        StateValidator.validateDescriptionLength(this.props.description, StateEntity.MIN_DESC, StateEntity.MAX_DESC);
    }

    //#endregion

    //# region CREATION
    public static create(props: StateProps): StateEntity {
        return new StateEntity(props);
    }

    //#endregion

    //#region UPDATES
    public update(props: Partial<StateProps>): this {
        return this.cloneWith(props);
    }

    //#endregion
}
