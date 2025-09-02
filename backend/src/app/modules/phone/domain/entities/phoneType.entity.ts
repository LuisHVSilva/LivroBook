import {EntityBase} from "@coreShared/base/entity.base";
import {PhoneTypeTransformer} from "@phone/domain/transformers/phoneType.transform";
import {PhoneTypeValidator} from "@phone/domain/validations/phoneType.validation";

export interface PhoneTypeProps {
    id?: number;
    description: string;
    statusId: number;
}

export class PhoneTypeEntity extends EntityBase<PhoneTypeProps> {
    //#region PROPERTIES
    public static readonly MIN_DESC: number = 4;
    public static readonly MAX_DESC: number = 50;
    public static readonly ENTITY_NAME: string = 'phone_type';
    //#endregion

    //#region CONSTRUCTOR
    constructor(props: PhoneTypeProps) {
        const normalizedProps: PhoneTypeProps = {
            ...props,
            description: PhoneTypeTransformer.normalizeDescription(props.description),
        };

        super(normalizedProps);
        this.validateRequiredFields(['description', 'statusId']);
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

    get statusId(): number {
        return this.props.statusId;
    }
    //#endregion

    //#region VALIDATION
    private validate(): void {
        PhoneTypeValidator.validateDescriptionLength(this.props.description, PhoneTypeEntity.MIN_DESC, PhoneTypeEntity.MAX_DESC);
    }
    //#endregion

    //#region CREATE
    public static create(props: PhoneTypeProps): PhoneTypeEntity {
        return new PhoneTypeEntity(props);
    }
    //#endregion

    //#region UPDATE
    public update(props: Partial<PhoneTypeProps>): this {
        return this.cloneWith(props);
    }
    //#endregion
}