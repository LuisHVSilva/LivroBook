import {IUseCase} from "@coreShared/interfaces/IUseCase";
import {CreateLocationDTO, CreateLocationResponseDTO} from "@location/adapters/dtos/location.dto";
import {ResultType} from "@coreShared/types/result.type";


export interface ICreateLocationUseCase extends IUseCase<CreateLocationDTO, ResultType<CreateLocationResponseDTO>> {
}