import { z } from "zod";

import {ZodValidator} from "@coreShared/validators/zod.validator";
import {UserCredentialEntity} from "@user/domain/entities/userCredential.entity";

export const CreateUserCredentialSchema = z.object({
    //Once other authentication methods are implemented, leave them as optional.
    password: ZodValidator.stringInputValue(UserCredentialEntity.MIN_PASSWORD),
});
