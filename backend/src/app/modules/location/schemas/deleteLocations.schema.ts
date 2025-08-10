import { z } from 'zod';

export const DeleteLocationSchema = z.object({
    countriesId: z.string().optional(),
    statesId: z.string().optional(),
    citiesId: z.string().optional(),
}).refine(data =>
        data.countriesId || data.statesId || data.citiesId,
    {
        message: 'Pelo menos um dos campos (countriesId, statesId ou citiesId) deve ser preenchido.'
    }
);

export type DeleteLocationDTO = z.infer<typeof DeleteLocationSchema>;
