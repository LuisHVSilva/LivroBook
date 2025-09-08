import { z } from "zod";
import {ZodValidator} from "@coreShared/validators/zod.validator";
import {UserCredentialTypeEntity} from "@user/domain/entities/userCredentialType.entity";

export const UpdateUserCredentialTypeSchema = z.object({
    id: ZodValidator.intInputValue(),
    description: ZodValidator.stringInputValue(UserCredentialTypeEntity.MIN_DESC, UserCredentialTypeEntity.MAX_DESC, true),
    statusId: ZodValidator.intInputValue(undefined, undefined, true),
});