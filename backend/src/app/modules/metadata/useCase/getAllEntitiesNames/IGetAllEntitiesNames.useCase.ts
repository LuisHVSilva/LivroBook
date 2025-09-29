import {IUseCase} from "@coreShared/interfaces/IUseCase";
import {GetAllEntitiesNamesDTO} from "@modules/metadata/adapters/dtos/metadata.dto";

export interface IGetAllEntitiesNamesUseCase extends IUseCase<undefined, GetAllEntitiesNamesDTO> {

}