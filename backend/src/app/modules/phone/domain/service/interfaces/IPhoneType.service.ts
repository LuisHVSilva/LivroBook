import {CreatePhoneTypeDTO, PhoneTypeFilterDTO, UpdatePhoneTypeDTO} from "@phone/adapters/dtos/phoneType.dto";
import {PhoneTypeEntity} from "@phone/domain/entities/phoneType.entity";
import {Transaction} from "sequelize";
import {CreateResultType, UpdateResultType} from "@coreShared/types/crudResult.type";
import {FindAllType} from "@coreShared/types/findAll.type";



export interface IPhoneTypeService {
    create(data: CreatePhoneTypeDTO, transaction: Transaction): Promise<CreateResultType<PhoneTypeEntity>>;
    getAll(filter: PhoneTypeFilterDTO, page?: number, limit?: number): Promise<FindAllType<PhoneTypeEntity>>;
    getById(id: number): Promise<PhoneTypeEntity | null>;
    update(newData: UpdatePhoneTypeDTO, transaction: Transaction): Promise<UpdateResultType<PhoneTypeEntity>>;
    delete(id: number, transaction: Transaction): Promise<void>;
}