import {Domain, DtoField, Label, UpperCase} from "../../../decorators/domain.decorator.ts";
import {type BaseEntityType, EntityDomainBase} from "../../entity.domain.base.ts";

export type UserEntity = {
    name: string;
    email: string;
    document?: string;
    documentType?: string;
    birthday: Date;
    isTwoFactorEnable: boolean;
    isEmailVerified: boolean;
    city?: string;
    phone?: string;
    userType: string;
    status: string;
} & BaseEntityType


@Domain()
export class UserDomainEntity extends EntityDomainBase<UserEntity> {
    @Label("Id")
    @DtoField("id", {type: "number"})
    get id(): number | undefined {
        return this.props.id;
    }

    @Label("Nome")
    @DtoField("name")
    @UpperCase()
    get name(): string {
        return this.props.name;
    }

    @Label("Email")
    @DtoField("email")
    get email(): string {
        return this.props.email;
    }

    @Label("Documento")
    @DtoField("document")
    get document(): string | undefined {
        return this.props.document;
    }

    @Label("Tipo de documento")
    @DtoField("documentType")
    get documentType(): string | undefined {
        return this.props.documentType;
    }

    @Label("Aniversário")
    @DtoField("birthday", {type: "date"})
    get birthday(): Date {
        return this.props.birthday;
    }

    @Label("Dois fatores")
    @DtoField("isTwoFactorEnable", {type: "boolean"})
    get isTwoFactorEnable(): boolean {
        return this.props.isTwoFactorEnable;
    }

    @Label("Email confirmado")
    @DtoField("isEmailVerified", {type: "boolean"})
    get isEmailVerified(): boolean {
        return this.props.isEmailVerified;
    }

    @Label("Cidade")
    @DtoField("city")
    get city(): string | undefined {
        return this.props.city;
    }

    @Label("Telefone")
    @DtoField("phone")
    get phone(): string | undefined {
        return this.props.phone;
    }

    @Label("Tipo de usuário")
    @DtoField("userType")
    get userType(): string {
        return this.props.userType;
    }

    @Label("Status")
    @DtoField("status")
    get status(): string {
        return this.props.status;
    }
}
