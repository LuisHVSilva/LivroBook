import {BaseEntity} from "@coreShared/base/baseEntity";
import {CityTransformer} from "@location/domain/transformers/city.transform";
import {CityValidator} from "@location/domain/validators/city.validator";

export interface CityProps {
    id?: number;
    description: string;
    stateId: number;
    statusId: number
}

export class CityEntity extends BaseEntity<CityProps> {
    //#region PROPERTIES
    public static readonly MIN_DESC: number = 3;
    public static readonly MAX_DESC: number = 250;
    public static readonly ENTITY_NAME: string = "CITY";
    //#endregion

    //#region CONSTRUCTOR
    private constructor(props: CityProps) {
        const normalizedProps: CityProps = {
            ...props,
            description: CityTransformer.normalizeDescription(props.description),
        };
        super(normalizedProps);

        this.validateRequiredFields(['description', 'stateId', 'statusId']);
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

    get stateId(): number {
        return this.props.stateId;
    }

    get statusId(): number {
        return this.props.statusId;
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

    public withProps(props: Partial<CityProps>): CityEntity {
        return CityEntity.create({
            id: this.id,
            description: props.description ?? this.description,
            stateId: props.stateId ?? this.stateId,
            statusId: props.statusId ?? this.statusId,
        });
    }
    //#endregion

    //#region UPDATES
    public updateProps(props: Partial<CityProps>): this {
        return this.cloneWith(props);
    }
    //#endregion
}