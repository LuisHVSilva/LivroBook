import { z } from "zod";
import {ZodValidator} from "@coreShared/validators/zod.validator";
import {UserEntity} from "@user/domain/entities/user.entity";
import {CityEntity} from "@location/domain/entities/city.entity";
import {DocumentTypeEntity} from "@document/domain/entities/documentType.entity";
import {PhoneEntity} from "@phone/domain/entities/phone.entity";
import {StatusEntity} from "@status/domain/entities/status.entity";
import {UserTypeEntity} from "@user/domain/entities/userType.entity";

export const UpdateUserSchema = z.object({
    id: ZodValidator.intInputValue(),
    name: ZodValidator.stringInputValue(UserEntity.MIN_NAME, UserEntity.MAX_NAME, true),
    email: ZodValidator.stringInputValue(UserEntity.MIN_EMAIL, UserEntity.MAX_EMAIL, true),
    document: ZodValidator.stringInputValue(UserEntity.MIN_DOC, UserEntity.MAX_DOC, true),
    birthday: ZodValidator.dateInputValue(true),
    city: ZodValidator.stringInputValue(CityEntity.MIN_DESC, CityEntity.MAX_DESC, true),
    userType: ZodValidator.stringInputValue(UserTypeEntity.MIN_DESC, UserTypeEntity.MAX_DESC, true),
    documentType: ZodValidator.stringInputValue(DocumentTypeEntity.MIN_DESC, DocumentTypeEntity.MAX_DESC, true),
    phone: ZodValidator.stringInputValue(PhoneEntity.MIN_NUMBER, PhoneEntity.MAX_NUMBER, true),
    status: ZodValidator.stringInputValue(StatusEntity.MIN_DESC, StatusEntity.MAX_DESC, true),
}).strict();