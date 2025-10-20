import {Domain, DtoField, Label, UpperCase} from "../../../decorators/domain.decorator.ts";
import {type BaseEntityType, EntityDomainBase} from "../../entity.domain.base.ts";

export type CityEntity = {
    description: string;
    state: string
    status: string;
} & BaseEntityType

@Domain()
export class CityDomainEntity extends EntityDomainBase<CityEntity> {
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
