import { z } from "zod";

export const UpdatePhoneSchema = z.object({
    id: z.number().int().positive(),
    newNumber: z.string().min(4).optional(),
    newPhoneCodeId: z.number().int().positive().optional(),
    newPhoneTypeId: z.number().int().positive().optional(),
    newStatusId: z.number().int().positive().optional(),
});