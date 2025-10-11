import { z } from "zod";
import {ZodValidator} from "@coreShared/validators/zod.validator";
import {UserCredentialTypeEntity} from "@user/domain/entities/userCredentialType.entity";
import {StatusEntity} from "@status/domain/entities/status.entity";

export const UpdateUserCredentialTypeSchema = z.object({
    id: ZodValidator.intInputValue(),
    description: ZodValidator.stringInputValue(UserCredentialTypeEntity.MIN_DESC, UserCredentialTypeEntity.MAX_DESC, true),
    status: ZodValidator.stringInputValue(StatusEntity.MIN_DESC, StatusEntity.MAX_DESC, true),
});