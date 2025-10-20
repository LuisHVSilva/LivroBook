import {EntityRepositoryBase} from "../../entity.repository.base.ts";
import type {DocumentTypeEntity} from "./documentType.domain.entity.ts";

export class DocumentTypeRepositoryEntity extends EntityRepositoryBase<DocumentTypeEntity, "documentType"> {
    constructor() {
        super("documentType");
    }
}