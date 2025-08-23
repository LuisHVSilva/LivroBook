import {Transaction} from "sequelize";
import {UpdateResultType} from "@coreShared/types/crudResult.type";
import {DeleteReport} from "@coreShared/utils/operationReport.util";
import {FindAllType} from "@coreShared/types/findAll.type";
import {CreatePhoneDTO, PhoneFilterDTO, UpdatePhoneDTO} from "@phone/adapters/dtos/phone.dto";
import {PhoneEntity} from "@phone/domain/entities/phone.entity";
import {DeleteStatusEnum} from "@coreShared/enums/deleteStatus.enum";

// interface PhoneTypes extends EntityType<
//     PhoneEntity,
//     PhoneModel,
//     PhoneDTO,
//     CreatePhoneDTO,
//     UpdatePhoneDTO,
//     PhoneFilterDTO
// > {
// }

export interface IPhoneService {
    create(data: CreatePhoneDTO, transaction: Transaction): Promise<PhoneEntity>;

    getById(id: number): Promise<PhoneEntity>;

    findMany(filter: PhoneFilterDTO, page?: number, limit?: number): Promise<FindAllType<PhoneEntity>>;

    update(newData: UpdatePhoneDTO, transaction: Transaction): Promise<UpdateResultType<PhoneEntity>>;

    delete(id: number, transaction: Transaction): Promise<DeleteStatusEnum>;

    deleteMany(ids: number[], transaction: Transaction): Promise<DeleteReport>;
}