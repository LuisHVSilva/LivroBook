import {Domain, DtoField, Label, UpperCase} from "../../../decorators/domain.decorator.ts";
import {type BaseEntityType, EntityDomainBase} from "../../entity.domain.base.ts";

export type UserCredentialTypeEntity = {
    description: string;
    status: string;
} & BaseEntityType


@Domain()
export class UserCredentialTypeDomainEntity extends EntityDomainBase<UserCredentialTypeEntity> {
    @Label("Id")
    @DtoField("id", {type: "number"})
    get id(): number | undefined {
        return this.props.id;
    }

    @Label("Descrição")
    @DtoField("description")
    @UpperCase()
    get description(): string {
        return this.props.description;
    }

    @Label("Status")
    @DtoField("status")
    get status(): string {
        return this.props.status;
    }
}
