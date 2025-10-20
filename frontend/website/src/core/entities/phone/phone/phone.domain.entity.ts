import {Domain, DtoField, Label} from "../../../decorators/domain.decorator.ts";
import {type BaseEntityType, EntityDomainBase} from "../../entity.domain.base.ts";

export type PhoneEntity = {
    id?: number;
    number: string;
    phoneCode: {
        dddCode: number;
        ddiCode: number;
    },
    phoneType: string;
    status: string;
} & BaseEntityType

@Domain()
export class PhoneDomainEntity extends EntityDomainBase<PhoneEntity> {
    @Label("Id")
    @DtoField("id", {type: "number"})
    get id(): number | undefined {
        return this.props.id;
    }

    @Label("Número")
    @DtoField("number")
    get number(): string {
        return this.props.number;
    }

    @Label("DDI")
    @DtoField("phoneCode.ddiCode", {type: "number", nested: true})
    get ddiCode(): number {
        return this.props.phoneCode.ddiCode;
    }

    @Label("DDD")
    @DtoField("phoneCode.dddCode", {type: "number", nested: true})
    get dddCode(): number {
        return this.props.phoneCode.dddCode;
    }

    @Label("Tipo de telefone")
    @DtoField("phoneType")
    get phoneType(): string {
        return this.props.phoneType;
    }

    @Label("Status")
    @DtoField("status")
    get status(): string {
        return this.props.status;
    }
}
