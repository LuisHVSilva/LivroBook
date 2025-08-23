import {CreatePhoneTypeDTO, PhoneTypeFilterDTO, UpdatePhoneTypeDTO} from "@phone/adapters/dtos/phoneType.dto";
import {PhoneTypeEntity} from "@phone/domain/entities/phoneType.entity";
import {Transaction} from "sequelize";
import {UpdateResultType} from "@coreShared/types/crudResult.type";
import {FindAllType} from "@coreShared/types/findAll.type";
import {DeleteReport} from "@coreShared/utils/operationReport.util";
import {DeleteStatusEnum} from "@coreShared/enums/deleteStatus.enum";

export interface IPhoneTypeService {
    create(data: CreatePhoneTypeDTO, transaction: Transaction): Promise<PhoneTypeEntity>;

    getById(id: number): Promise<PhoneTypeEntity>;

    findMany(filter: PhoneTypeFilterDTO, page?: number, limit?: number): Promise<FindAllType<PhoneTypeEntity>>;

    update(newData: UpdatePhoneTypeDTO, transaction: Transaction): Promise<UpdateResultType<PhoneTypeEntity>>;

    delete(id: number, transaction: Transaction): Promise<DeleteStatusEnum>;

    deleteMany(ids: number[], transaction: Transaction): Promise<DeleteReport>;
}