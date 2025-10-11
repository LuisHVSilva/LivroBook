import { z } from "zod";
import {ZodValidator} from "@coreShared/validators/zod.validator";
import {DocumentTypeEntity} from "@document/domain/entities/documentType.entity";
import {CountryEntity} from "@location/domain/entities/country.entity";
import {StatusEntity} from "@status/domain/entities/status.entity";

export const UpdateDocumentTypeSchema = z.object({
    id: ZodValidator.intInputValue(),
    description: ZodValidator.stringInputValue(DocumentTypeEntity.MIN_DESC, DocumentTypeEntity.MAX_DESC, true),
    country: ZodValidator.intInputValue(CountryEntity.MIN_DESC, CountryEntity.MAX_DESC, true),
    status: ZodValidator.intInputValue(StatusEntity.MAX_DESC, StatusEntity.MIN_DESC, true),
}).strict();