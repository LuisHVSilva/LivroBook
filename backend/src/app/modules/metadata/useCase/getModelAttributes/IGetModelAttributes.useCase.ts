import {IUseCase} from "@coreShared/interfaces/IUseCase";
import {SimplifiedMetadataAttribute} from "@coreShared/types/metadata.type";
import {ModelAttributeRequestDto} from "@modules/metadata/adapters/dtos/metadata.dto";

export interface IGetModelAttributesUseCase extends IUseCase<ModelAttributeRequestDto, SimplifiedMetadataAttribute[]> {

}