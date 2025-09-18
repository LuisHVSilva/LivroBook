import { z } from "zod";
import {ZodValidator} from "@coreShared/validators/zod.validator";

export const LoginSchema = z.object({
    email: ZodValidator.stringInputValue(),
    password: ZodValidator.stringInputValue(),
});