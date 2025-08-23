import {
    CreatePhoneCodeDTO,
    PhoneCodeFilterDTO, UpdatePhoneCodeDTO
} from "@phone/adapters/dtos/phoneCode.dto";
import {Transaction} from "sequelize";
import {FindAllType} from "@coreShared/types/findAll.type";
import {PhoneCodeEntity} from "@phone/domain/entities/phoneCode.entity";
import {DeleteStatusEnum} from "@coreShared/enums/deleteStatus.enum";
import {DeleteReport} from "@coreShared/utils/operationReport.util";
import {UpdateResultType} from "@coreShared/types/crudResult.type";


export interface IPhoneCodeService {
    create(data: CreatePhoneCodeDTO, transaction: Transaction): Promise<PhoneCodeEntity>;

    getById(id: number): Promise<PhoneCodeEntity | null>;

    findMany(filter: PhoneCodeFilterDTO, page?: number, limit?: number): Promise<FindAllType<PhoneCodeEntity>>;

    update(newData: UpdatePhoneCodeDTO, transaction: Transaction): Promise<UpdateResultType<PhoneCodeEntity>>;

    delete(id: number, transaction: Transaction): Promise<DeleteStatusEnum>;

    deleteMany(ids: number[], transaction: Transaction): Promise<DeleteReport>
}