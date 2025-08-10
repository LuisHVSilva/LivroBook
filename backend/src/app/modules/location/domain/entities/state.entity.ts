import {BaseEntity} from "@coreShared/base/baseEntity";
import {StateTransformer} from "@location/domain/transformers/state.transform";
import {StateValidator} from "@location/domain/validators/state.validator";

export interface StateProps {
    id?: number;
    description: string;
    countryId: number;
    statusId: number;
}

export class StateEntity extends BaseEntity<StateProps> {
    //#region PROPERTIES
    public static readonly MIN_DESC: number = 3;
    public static readonly MAX_DESC: number = 100;
    public static readonly ENTITY_NAME: string = "State";
    //#endregion

    //#region CONSTRUCTOR
    private constructor(props: StateProps) {
        const normalizedProps: StateProps = {
            ...props,
            description: StateTransformer.normalizeDescription(props.description),
        };
        super(normalizedProps);
        this.validateRequiredFields(['description', 'countryId', 'statusId']);
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

    get countryId(): number {
        return this.props.countryId;
    }

    get statusId(): number {
        return this.props.statusId;
    }
    //#endregion

    //#region VALIDATIONS
    private validate(): void {
        StateValidator.validateDescriptionLength(this.props.description, StateEntity.MIN_DESC, StateEntity.MAX_DESC);
    }

    //#endregion

    //# region CREATION | RESTORATION
    public static create(props: StateProps): StateEntity {
        return new StateEntity(props);
    }

    public withProps(props: Partial<StateProps>): StateEntity {
        return StateEntity.create({
            id: this.id,
            description: props.description ?? this.description,
            countryId: props.countryId ?? this.countryId,
            statusId: props.statusId ?? this.statusId,
        });
    }
    //#endregion

    //#region UPDATES
    public updateProps(props: Partial<StateProps>): this {
        return this.cloneWith(props);
    }
    //#endregion
}
