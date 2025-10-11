import { z } from "zod";
import {ZodValidator} from "@coreShared/validators/zod.validator";
import {DocumentTypeEntity} from "@document/domain/entities/documentType.entity";
import {CountryEntity} from "@location/domain/entities/country.entity";

export const CreateDocumentTypeSchema = z.object({
    description: ZodValidator.stringInputValue(DocumentTypeEntity.MIN_DESC, DocumentTypeEntity.MAX_DESC),
    country:  ZodValidator.stringInputValue(CountryEntity.MIN_DESC, CountryEntity.MAX_DESC),
}).strict();
