import {EntityBase} from "@coreShared/base/entity.base";
import {PhoneCodeValidator} from "@phone/domain/validations/phoneCode.validation";
import {StateTransformer} from "@location/domain/transformers/state.transform";
import {StatusTransformer} from "@status/domain/transformers/Status.transformer";

export interface PhoneCodeProps {
    id?: number;
    ddiCode: number;
    dddCode: number;
    state: string;
    status: string;
}

export class PhoneCodeEntity extends EntityBase<PhoneCodeProps> {
    //#region PROPERTIES
    private static readonly MIN_DDI_DIGITS: number = 1;
    public static readonly MIN_DDI_VALUE: number = Math.pow(10, this.MIN_DDI_DIGITS - 1);


    private static readonly MAX_DDI_DIGITS: number = 4;
    public static readonly MAX_DDI_VALUE: number = Math.pow(10, this.MAX_DDI_DIGITS) - 1;

    private static readonly MIN_DDD_DIGITS: number = 1;
    public static readonly MIN_DDD_VALUE: number = Math.pow(10, this.MIN_DDD_DIGITS - 1);

    private static readonly MAX_DDD_DIGITS: number = 4;
    public static readonly MAX_DDD_VALUE: number = Math.pow(10, this.MAX_DDD_DIGITS) - 1;
    //#endregion

    //#region CONSTRUCTOR
    constructor(props: PhoneCodeProps) {
        const normalizedProps: PhoneCodeProps = {
            ...props,
            state: StateTransformer.normalizeDescription(props.state),
            status: StatusTransformer.normalizeDescription(props.status),
        };
        super(normalizedProps);

        this.validateRequiredFields(['ddiCode', 'dddCode', 'state', 'status']);
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

    get state(): string {
        return this.props.state;
    }

    get status(): string {
        return this.props.status;
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