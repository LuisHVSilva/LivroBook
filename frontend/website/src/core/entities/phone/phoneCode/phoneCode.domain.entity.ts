import {Domain, DtoField, Label, UpperCase} from "../../../decorators/domain.decorator.ts";
import {type BaseEntityType, EntityDomainBase} from "../../entity.domain.base.ts";

export type PhoneCodeEntity = {
    ddiCode: number;
    dddCode: number;
    state: string;
    status: string;
} & BaseEntityType

@Domain()
export class PhoneCodeDomainEntity extends EntityDomainBase<PhoneCodeEntity> {
    @Label("Id")
    @DtoField("id", {type: "number"})
    get id(): number | undefined {
        return this.props.id;
    }

    @Label("DDI")
    @DtoField("ddiCode", {type: "number"})
    @UpperCase()
    get ddiCode(): number {
        return this.props.ddiCode;
    }

    @Label("DDD")
    @DtoField("dddCode", {type: "number"})
    @UpperCase()
    get dddCode(): number {
        return this.props.dddCode;
    }

    @Label("Estado")
    @DtoField("state")
    get state(): string {
        return this.props.state;
    }

    @Label("Status")
    @DtoField("status")
    get status(): string {
        return this.props.status;
    }
}
