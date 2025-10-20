import {Domain, DtoField, Label, UpperCase} from "../../decorators/domain.decorator.ts";
import {type BaseEntityType, EntityDomainBase} from "../entity.domain.base.ts";

export type StatusEntity = {
    description: string;
    active: boolean;
} & BaseEntityType;

@Domain()
export class StatusDomainEntity extends EntityDomainBase<StatusEntity> {
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

    @Label("Ativo")
    @DtoField("active", {type: "boolean"})
    get active(): boolean {
        return this.props.active;
    }
}
