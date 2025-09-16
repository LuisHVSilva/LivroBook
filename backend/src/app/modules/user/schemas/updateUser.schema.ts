import { z } from "zod";
import {ZodValidator} from "@coreShared/validators/zod.validator";
import {UserEntity} from "@user/domain/entities/user.entity";

export const UpdateUserSchema = z.object({
    id: ZodValidator.intInputValue(),
    name: ZodValidator.stringInputValue(UserEntity.MIN_NAME, UserEntity.MAX_NAME, true),
    email: ZodValidator.stringInputValue(UserEntity.MIN_EMAIL, UserEntity.MAX_EMAIL, true),
    document: ZodValidator.stringInputValue(UserEntity.MIN_DOC, UserEntity.MAX_DOC, true),
    birthday: ZodValidator.dateInputValue(true),
    cityId: ZodValidator.intInputValue(undefined, undefined, true),
    documentTypeId: ZodValidator.intInputValue(undefined, undefined, true),
    userCredentialId: ZodValidator.intInputValue(undefined, undefined, true),
    phoneId: ZodValidator.intInputValue(undefined, undefined, true),
    statusId: ZodValidator.intInputValue(undefined, undefined, true),
});