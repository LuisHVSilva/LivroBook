import { z } from "zod";

import {ZodValidator} from "@coreShared/validators/zod.validator";
import {UserTypeEntity} from "@user/domain/entities/userType.entity";

export const CreateUserTypeSchema = z.object({
    description: ZodValidator.stringInputValue(UserTypeEntity.MIN_DESC, UserTypeEntity.MAX_DESC),
});
