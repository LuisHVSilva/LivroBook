import {IUseCase} from "@coreShared/interfaces/IUseCase";
import {UpdateUserTypeDTO} from "@user/adapters/dtos/userType.dto";
import {UpdateResultType} from "@coreShared/types/crudResult.type";
import {UserTypeEntity} from "@user/domain/entities/userType.entity";

export interface IUpdateUserTypeUseCase extends IUseCase<UpdateUserTypeDTO, UpdateResultType<UserTypeEntity>> {
}