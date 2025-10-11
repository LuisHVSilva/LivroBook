import { z } from "zod";
import {ZodValidator} from "@coreShared/validators/zod.validator";
import {UserTypeEntity} from "@user/domain/entities/userType.entity";
import {StatusEntity} from "@status/domain/entities/status.entity";

export const UpdateUserTypeSchema = z.object({
    id: ZodValidator.intInputValue(),
    description: ZodValidator.stringInputValue(UserTypeEntity.MIN_DESC, UserTypeEntity.MAX_DESC, true),
    status: ZodValidator.stringInputValue(StatusEntity.MIN_DESC, StatusEntity.MAX_DESC, true),
});