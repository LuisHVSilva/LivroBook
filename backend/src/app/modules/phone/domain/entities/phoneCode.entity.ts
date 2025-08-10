import {BaseEntity} from "@coreShared/base/baseEntity";
import {PhoneCodeValidator} from "@phone/domain/validations/phoneCode.validation";
import {PhoneTypeProps} from "@phone/domain/entities/phoneType.entity";

export interface PhoneCodeProps{
    id?: number;
    ddiCode: string;
    dddCode: string;
    stateId: number;
    statusId: number;
}

export class PhoneCodeEntity extends BaseEntity<PhoneCodeProps>{
    //#region PROPERTIES
    public static readonly MIN_DESC_DDI: number = 2;
    public static readonly MAX_DESC_DDI: number = 10;
    public static readonly MIN_DESC_DDD: number = 2;
    public static readonly MAX_DESC_DDD: number = 20;
    public static readonly ENTITY_NAME: string = 'phone_code';
    //#endregion

    //#region CONSTRUCTOR
    private constructor(props: PhoneCodeProps) {
        super(props);

        this.validateRequiredFields(['ddiCode', 'dddCode', 'stateId', 'statusId']);
        this.validate();
    }
    //#endregion

    //#region GET
    get id(): number | undefined {
        return this.props.id;
    }

    get ddiCode(): string {
        return this.props.ddiCode;
    }

    get dddCode(): string {
        return this.props.dddCode;
    }

    get stateId(): number {
        return this.props.stateId;
    }

    get statusId(): number {
        return this.props.statusId;
    }
    //#endregion

    //#region VALIDATION
    private validate(): void {
        PhoneCodeValidator.validateDdiCodeLength(this.props.ddiCode, PhoneCodeEntity.MIN_DESC_DDI, PhoneCodeEntity.MAX_DESC_DDI);
        PhoneCodeValidator.validateDddCodeLength(this.props.dddCode, PhoneCodeEntity.MIN_DESC_DDD, PhoneCodeEntity.MAX_DESC_DDD);
    }
    //#endregion

    //#region CREATE
    public static create(props: PhoneCodeProps): PhoneCodeEntity {
        return new PhoneCodeEntity(props);
    }
    //#endregion

    //#region UPDATE
    public update(props: Partial<PhoneTypeProps>): this {
        return this.cloneWith(props);
    }
    //#endregion
}