import {EntityBase} from "@coreShared/base/entity.base";
import {PhoneValidator} from "@phone/domain/validations/phone.validation";
import {StatusTransformer} from "@status/domain/transformers/Status.transformer";
import {PhoneTypeTransformer} from "@phone/domain/transformers/phoneType.transform";

export interface PhoneProps {
    id?: number;
    number: string;
    phoneCode: {
        dddCode: number;
        ddiCode: number;
    },
    phoneType: string;
    status: string;
}


export class PhoneEntity extends EntityBase<PhoneProps> {
    //#region PROPERTIES
    public static readonly MIN_NUMBER: number = 4;
    public static readonly MAX_NUMBER: number = 20;
    //#endregion

    //#region CONSTRUCTOR
    constructor(props: PhoneProps) {
        const normalizedProps: PhoneProps = {
            ...props,
            phoneType: PhoneTypeTransformer.normalizeDescription(props.phoneType),
            status: StatusTransformer.normalizeDescription(props.status),
        };
        super(normalizedProps);
        this.validateRequiredFields(['number', 'phoneCode', 'status']);
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

    get phoneCode(): { dddCode: number; ddiCode: number } {
        return this.props.phoneCode;
    }

    get phoneType(): string {
        return this.props.phoneType;
    }

    get status(): string {
        return this.props.status;
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
        const override = this.deepMerge(this.props, props);
        return this.cloneWith(override);
    }

    //#endregion
}