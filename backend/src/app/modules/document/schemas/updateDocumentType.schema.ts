import { z } from "zod";
import {ZodValidator} from "@coreShared/validators/zod.validator";
import {DocumentTypeEntity} from "@document/domain/entities/documentType.entity";

export const UpdateDocumentTypeSchema = z.object({
    id: ZodValidator.intInputValue(),
    description: ZodValidator.stringInputValue(DocumentTypeEntity.MIN_DESC, DocumentTypeEntity.MAX_DESC),
    countryId: ZodValidator.intInputValue(undefined, undefined, true),
    statusId: ZodValidator.intInputValue(undefined, undefined, true),
});