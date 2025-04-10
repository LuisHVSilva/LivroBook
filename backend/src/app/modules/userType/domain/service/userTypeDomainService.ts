import "reflect-metadata"
import {inject, injectable} from "tsyringe";
import {IUserTypeRepository} from "@userType/infrastructure/repository/IUserTypeRepository";
import {ValidateError} from "@coreShared/errors/ValidateError";
import {UserTypeMessages} from "@coreShared/messages/userTypeMessages";
import {IUserTypeDomainService} from "@userType/domain/service/IUserTypeDomainService";

@injectable()
export class UserTypeDomainService implements IUserTypeDomainService {
    //#region constants
    private readonly className: string = "UserTypeDomainService";
    //#endregion

    constructor(@inject("IUserTypeRepository") private readonly repository: IUserTypeRepository) {}

    //#region methods
    public async ensureDescriptionIsUnique(description: string): Promise<void> {
        const existingUserType : number = await this.repository.countByDescription(description);
        if(existingUserType > 0) {
            throw new ValidateError(this.className, UserTypeMessages.Error.Validation.DUPLICATE_ENTITY(description));
        }
    }
    //#endregion
}
