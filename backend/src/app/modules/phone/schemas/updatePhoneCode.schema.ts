import { z } from "zod";

export const UpdatePhoneCodeSchema = z.object({
    id: z.number().int().positive(),
    newDdiCode: z.number().int().positive().optional(),
    newDddCode: z.number().int().positive().optional(),
    newStateId: z.number().int().positive().optional(),
    newStatusId: z.number().int().positive().optional(),
});