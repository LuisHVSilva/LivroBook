import { z } from "zod";
import {ZodValidator} from "@coreShared/validators/zod.validator";
import {DocumentTypeEntity} from "@document/domain/entities/documentType.entity";

export const CreateDocumentTypeSchema = z.object({
    description: ZodValidator.stringInputValue(DocumentTypeEntity.MIN_DESC, DocumentTypeEntity.MAX_DESC),
    countryId: ZodValidator.intInputValue(),
});
