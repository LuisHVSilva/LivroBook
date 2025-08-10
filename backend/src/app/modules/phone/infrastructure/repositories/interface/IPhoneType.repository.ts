import {IBaseRepository} from "@coreShared/interfaces/IBaseRepository";
import {PhoneTypeEntity} from "@phone/domain/entities/phoneType.entity";
import {PhoneTypeModel} from "@phone/infrastructure/models/phoneType.model";
import {FindFilterPhoneTypeDTO} from "@phone/adapters/dtos/phoneType.dto";
import {ResultType} from "@coreShared/types/result.type";

export interface IPhoneTypeRepository extends IBaseRepository<PhoneTypeEntity, PhoneTypeModel, FindFilterPhoneTypeDTO> {
    findByDescription(description: string): Promise<ResultType<PhoneTypeEntity>>
}