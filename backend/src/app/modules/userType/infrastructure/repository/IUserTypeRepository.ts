import {UserType} from "@userType/domain/userType";
import {IBaseRepository} from "@coreShared/interfaces/IBaseRepository";
import {RepositoryError} from "@coreShared/errors/RepositoryError";

export interface IUserTypeRepository extends IBaseRepository<UserType, RepositoryError>{
    countByDescription(description: string): Promise<number>;
}

