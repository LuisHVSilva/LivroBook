import { IUseCase } from "@coreShared/interfaces/usecases";
import {Result} from "@coreShared/types/Result";
import {CreateUserTypeInputDTO, CreateUserTypeOutputDTO} from "@userType/adapters/dtos/createUserTypeDTO";
import {UseCaseError} from "@coreShared/errors/useCaseError";

export interface ICreateUserTypeUseCase extends IUseCase<CreateUserTypeInputDTO, Result<CreateUserTypeOutputDTO, UseCaseError>> {}