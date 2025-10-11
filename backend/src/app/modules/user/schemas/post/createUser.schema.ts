import {z} from "zod";
import {ZodValidator} from "@coreShared/validators/zod.validator";
import {UserEntity} from "@user/domain/entities/user.entity";
import {CreatePhoneSchema} from "@phone/schemas/post/createPhone.schema";
import {CityEntity} from "@location/domain/entities/city.entity";
import {DocumentTypeEntity} from "@document/domain/entities/documentType.entity";
import {UserTypeEntity} from "@user/domain/entities/userType.entity";

export const CreateUserSchema = z.object({
    name: ZodValidator.stringInputValue(UserEntity.MIN_NAME, UserEntity.MAX_NAME),
    email: ZodValidator.stringInputValue(UserEntity.MIN_EMAIL, UserEntity.MAX_EMAIL),
    document: ZodValidator.stringInputValue(UserEntity.MIN_DOC, UserEntity.MAX_DOC, true),
    birthday: ZodValidator.dateInputValue(),
    userType: ZodValidator.stringInputValue(UserTypeEntity.MIN_DESC, UserTypeEntity.MAX_DESC, true),
    city: ZodValidator.stringInputValue(CityEntity.MIN_DESC, CityEntity.MAX_DESC, true),
    documentType: ZodValidator.stringInputValue(DocumentTypeEntity.MIN_DESC, DocumentTypeEntity.MAX_DESC, true),
    phone: CreatePhoneSchema.optional()
});
