import {BaseEntity} from "@coreShared/base/baseEntity";
import {PhoneCodeValidator} from "@phone/domain/validations/phoneCode.validation";

export interface PhoneCodeProps{
    id?: number;
    ddiCode: number;
    dddCode: number;
    stateId: number;
    statusId: number;
}

export class PhoneCodeEntity extends BaseEntity<PhoneCodeProps>{
    //#region PROPERTIES
    private static readonly MIN_DDI_DIGITS: number = 1;
    public static readonly MIN_DDI_VALUE: number = Math.pow(10, this.MIN_DDI_DIGITS - 1);


    private static readonly MAX_DDI_DIGITS: number = 4;
    public static readonly MAX_DDI_VALUE: number = Math.pow(10, this.MAX_DDI_DIGITS) - 1;

    private static readonly MIN_DDD_DIGITS: number = 1;
    public static readonly MIN_DDD_VALUE: number = Math.pow(10, this.MIN_DDD_DIGITS - 1);

    private static readonly MAX_DDD_DIGITS: number = 4;
    public static readonly MAX_DDD_VALUE: number = Math.pow(10, this.MAX_DDD_DIGITS) - 1;

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

    get ddiCode(): number {
        return this.props.ddiCode;
    }

    get dddCode(): number {
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
        PhoneCodeValidator.validateDdiCodeLength(this.props.ddiCode, PhoneCodeEntity.MIN_DDI_VALUE, PhoneCodeEntity.MAX_DDI_VALUE);
        PhoneCodeValidator.validateDddCodeLength(this.props.dddCode, PhoneCodeEntity.MIN_DDD_VALUE, PhoneCodeEntity.MAX_DDD_VALUE);
    }
    //#endregion

    //#region CREATE
    public static create(props: PhoneCodeProps): PhoneCodeEntity {
        return new PhoneCodeEntity(props);
    }
    //#endregion

    //#region UPDATE
    public update(props: Partial<PhoneCodeProps>): this {
        return this.cloneWith(props);
    }
    //#endregion
}