import {Transaction} from "sequelize";
import {CreateResultType, UpdateResultType} from "@coreShared/types/crudResult.type";
import {DeleteReport} from "@coreShared/utils/operationReport.util";
import {FindAllType} from "@coreShared/types/findAll.type";
import {CreatePhoneDTO, PhoneFilterDTO, UpdatePhoneDTO} from "@phone/adapters/dtos/phone.dto";
import {PhoneEntity} from "@phone/domain/entities/phone.entity";
import {DeleteStatusEnum} from "@coreShared/enums/deleteStatus.enum";


export interface IPhoneService {
    create(data: CreatePhoneDTO, transaction: Transaction): Promise<CreateResultType<PhoneEntity>>;
    getAll(filter: PhoneFilterDTO, page?: number, limit?: number): Promise<FindAllType<PhoneEntity>>;
    getById(id: number): Promise<PhoneEntity | null>;
    update(newData: UpdatePhoneDTO, transaction: Transaction): Promise<UpdateResultType<PhoneEntity>>;
    delete(id: number, transaction: Transaction): Promise<DeleteStatusEnum>;
    deleteMany(ids: number[], transaction: Transaction): Promise<DeleteReport>
}