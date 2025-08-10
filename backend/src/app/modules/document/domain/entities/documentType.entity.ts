import {BaseEntity} from "@coreShared/base/baseEntity";
import {DocumentTypeValidator} from "@document/domain/validators/documentType.validator";
import {DocumentTypeTransform} from "@document/domain/transformers/documentType.transform";

export interface DocumentTypeProps {
    id?: number;
    description: string;
    countryId: number
    statusId: number;
}

export class DocumentTypeEntity extends BaseEntity<DocumentTypeProps> {
    //#region PROPERTIES
    public static readonly ENTITY_NAME: string = 'DOCUMENT TYPE';
    public static readonly MIN_DESC: number = 2;
    public static readonly MAX_DESC: number = 50;
    //#endregion

    //#region CONSTRUCTOR
    constructor(props: DocumentTypeProps) {
        const normalizedProps: DocumentTypeProps = {
            ...props,
            description: DocumentTypeTransform.normalizeDescription(props.description),
        };
        super(normalizedProps);
        this.validateRequiredFields(['description', 'countryId', 'statusId']);
        this.validate();
    }
    //#endregion

    //#region GET
    get id(): number | undefined {
        return this.props.id;
    }

    get description(): string {
        return this.props.description;
    }

    get countryId(): number {
        return this.props.countryId;
    }

    get statusId(): number {
        return this.props.statusId;
    }
    //#endregion

    //#region VALIDATIONS
    private validate(): void {
        DocumentTypeValidator.validateDescriptionLength(this.props.description, DocumentTypeEntity.MIN_DESC, DocumentTypeEntity.MAX_DESC);
    }
    //#endregion

    //#region CREATE
    public static create(props: DocumentTypeProps): DocumentTypeEntity {
        return new DocumentTypeEntity(props);
    }
    //#endregion

    //#region UPDATES
    public updateProps(props: Partial<DocumentTypeProps>): this {
        return this.cloneWith(props);
    }
    //#endregion
}