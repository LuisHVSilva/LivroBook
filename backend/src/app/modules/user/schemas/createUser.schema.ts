import {z} from "zod";
import {ZodValidator} from "@coreShared/validators/zod.validator";
import {UserEntity} from "@user/domain/entities/user.entity";
import {CreateUserCredentialSchema} from "@user/schemas/createUserCredential.schema";
import {CreatePhoneSchema} from "@phone/schemas/createPhone.schema";

export const CreateUserSchema = z.object({
    name: ZodValidator.stringInputValue(UserEntity.MIN_NAME, UserEntity.MAX_NAME),
    email: ZodValidator.stringInputValue(UserEntity.MIN_EMAIL, UserEntity.MAX_EMAIL),
    document: ZodValidator.stringInputValue(UserEntity.MIN_DOC, UserEntity.MAX_DOC).optional(),
    birthday: ZodValidator.dateInputValue(),
    cityId: ZodValidator.intInputValue().optional(),
    documentTypeId: ZodValidator.intInputValue().optional(),
    userCredential: CreateUserCredentialSchema,
    phone: CreatePhoneSchema.optional()
});
