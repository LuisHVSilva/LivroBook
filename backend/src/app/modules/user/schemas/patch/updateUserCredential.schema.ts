import { z } from "zod";
import {ZodValidator} from "@coreShared/validators/zod.validator";
import {UserCredentialEntity} from "@user/domain/entities/userCredential.entity";

export const UpdateUserCredentialSchema = z.object({
    id: ZodValidator.intInputValue(),
    password: ZodValidator.stringInputValue(UserCredentialEntity.MIN_PASSWORD, undefined, true),
    newPassword: ZodValidator.stringInputValue(UserCredentialEntity.MIN_PASSWORD, undefined, true),
    status: ZodValidator.intInputValue(undefined, undefined, true),
}).superRefine((data, ctx) => {
    if (data.password && !data.newPassword) {
        ctx.addIssue({
            path: ["newPassword"],
            code: "custom",
            message: "newPassword é obrigatório quando password for informado",
        });
    }
});
