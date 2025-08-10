import {BaseEntity} from "@coreShared/base/baseEntity";
import {PhoneValidator} from "@phone/domain/validations/phone.validation";

export interface PhoneProps {
    id?: number;
    number: string;
    phoneCodeId: number;
    phoneTypeId: number;
    statusId: number;
}

export class PhoneEntity extends BaseEntity<PhoneProps> {
    //#region PROPERTIES
    public static readonly MIN_NUMBER: number = 4;
    public static readonly MAX_NUMBER: number = 20;
    public static readonly ENTITY_NAME: string = 'phone';
    //#endregion

    //#region CONSTRUCTOR
    private constructor(props: PhoneProps) {
        super(props);
        this.validateRequiredFields(['number', 'phoneCodeId', 'statusId']);
        this.validate();
    }
    //#endregion

    //#region GET
    get id(): number | undefined {
        return this.props.id;
    }

    get number(): string {
        return this.props.number;
    }

    get phoneCodeId(): number {
        return this.props.phoneCodeId;
    }

    get phoneTypeId(): number {
        return this.props.phoneTypeId;
    }

    get statusId(): number {
        return this.props.statusId;
    }
    //#endregion

    //#region VALIDATION
    private validate(): void {
        PhoneValidator.validateNumberFormat(this.props.number);
        PhoneValidator.validateNumberLength(this.props.number, PhoneEntity.MIN_NUMBER, PhoneEntity.MAX_NUMBER);
    }
    //#endregion

    //#region CREATE
    public static create(props: PhoneProps): PhoneEntity {
        return new PhoneEntity(props);
    }
    //#endregion

    //#region UPDATE
    public update(props: Partial<PhoneProps>): this {
        return this.cloneWith(props);
    }
    //#endregion
}