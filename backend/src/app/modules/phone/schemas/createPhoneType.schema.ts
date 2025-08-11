import { z } from "zod";
import {EntitiesMessage} from "@coreShared/messages/entities.message";

export const CreatePhoneTypeSchema = z.object({
    description: z.string().nonempty(EntitiesMessage.error.validation.descriptionRequired),
});
