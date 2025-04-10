import {UserType} from "@userType/domain/userType";
import {CreateUserTypeOutputDTO} from "@userType/adapters/dtos/createUserTypeDTO";
import {UserTypeMessages} from "@coreShared/messages/userTypeMessages";

export class UserTypePresenter {
    public static toCreateOutputDTO(userType: UserType): CreateUserTypeOutputDTO {
        return {
            message: UserTypeMessages.Success.Creation(userType.description),
            id: userType.id!.toString(),
            description: userType.description,
            status: userType.status.getDescription()
        };
    }
}