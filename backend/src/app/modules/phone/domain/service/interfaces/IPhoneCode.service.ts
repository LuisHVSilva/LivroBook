import {
    CreatePhoneCodeDTO,
    PhoneCodeFilterDTO,
    UpdatePhoneCodeDTO
} from "@phone/adapters/dtos/phoneCode.dto";
import {Transaction} from "sequelize";
import {CreateResultType, UpdateResultType} from "@coreShared/types/crudResult.type";
import {FindAllType} from "@coreShared/types/findAll.type";
import {PhoneCodeEntity} from "@phone/domain/entities/phoneCode.entity";


export interface IPhoneCodeService {
    create(data: CreatePhoneCodeDTO, transaction: Transaction): Promise<CreateResultType<PhoneCodeEntity>>;
    getAll(filter: PhoneCodeFilterDTO, page?: number, limit?: number): Promise<FindAllType<PhoneCodeEntity>>;
    getById(id: number): Promise<PhoneCodeEntity | null>;
    update(newData: UpdatePhoneCodeDTO, transaction: Transaction): Promise<UpdateResultType<PhoneCodeEntity>>;
    delete(id: number, transaction: Transaction): Promise<void>;
}