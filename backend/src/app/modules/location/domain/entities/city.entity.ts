import {EntityBase} from "@coreShared/base/entity.base";
import {CityTransformer} from "@location/domain/transformers/city.transform";
import {CityValidator} from "@location/domain/validators/city.validator";

export interface CityProps {
    id?: number;
    description: string;
    stateId: number;
    statusId: number
}

export class CityEntity extends EntityBase<CityProps> {
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
    //#endregion

    //#region UPDATES
    public update(props: Partial<CityProps>): this {
        return this.cloneWith(props);
    }
    //#endregion
}