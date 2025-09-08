import { z } from "zod";
import {ZodValidator} from "@coreShared/validators/zod.validator";
import {UserTypeEntity} from "@user/domain/entities/userType.entity";

export const UpdateUserTypeSchema = z.object({
    id: ZodValidator.intInputValue(),
    description: ZodValidator.stringInputValue(UserTypeEntity.MIN_DESC, UserTypeEntity.MAX_DESC, true),
    statusId: ZodValidator.intInputValue(undefined, undefined, true),
});