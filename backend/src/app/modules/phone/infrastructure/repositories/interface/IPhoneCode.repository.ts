import {PhoneCodeEntity} from "@phone/domain/entities/phoneCode.entity";
import {PhoneCodeModel} from "@phone/infrastructure/models/phoneCode.model";
import {PhoneCodeFilterDTO, PhoneCodePersistenceDTO} from "@phone/adapters/dtos/phoneCode.dto";
import {IRepositoryBase} from "@coreShared/base/interfaces/IRepositoryBase";
import {BaseRepositoryType} from "@coreShared/types/entity.type";

export type PhoneCodeBaseRepository = BaseRepositoryType<PhoneCodeModel, PhoneCodeEntity, PhoneCodeFilterDTO, PhoneCodePersistenceDTO>;

export interface IPhoneCodeRepository extends IRepositoryBase<PhoneCodeBaseRepository> {
}