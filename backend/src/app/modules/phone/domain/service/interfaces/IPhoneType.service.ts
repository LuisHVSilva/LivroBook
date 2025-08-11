import {CreatePhoneTypeDTO} from "@phone/adapters/dtos/phoneType.dto";
import {PhoneTypeEntity} from "@phone/domain/entities/phoneType.entity";
import {Transaction} from "sequelize";
import {CreateResultType} from "@coreShared/types/crudResult.type";



export interface IPhoneTypeService {
    create(data: CreatePhoneTypeDTO, transaction: Transaction): Promise<CreateResultType<PhoneTypeEntity>>
    // get(filter: PhoneTypeFilterDTO): Promise<PhoneTypeEntity | null>
}