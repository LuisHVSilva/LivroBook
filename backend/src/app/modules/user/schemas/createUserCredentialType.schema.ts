import { z } from "zod";

import {ZodValidator} from "@coreShared/validators/zod.validator";
import {UserCredentialTypeEntity} from "@user/domain/entities/userCredentialType.entity";

export const CreateUserCredentialTypeSchema = z.object({
    description: ZodValidator.stringInputValue(UserCredentialTypeEntity.MIN_DESC, UserCredentialTypeEntity.MAX_DESC),
});
