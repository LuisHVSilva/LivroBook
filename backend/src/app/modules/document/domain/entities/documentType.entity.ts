import {EntityBase} from "@coreShared/base/entity.base";
import {DocumentTypeValidator} from "@document/domain/validators/documentType.validator";
import {DocumentTypeTransform} from "@document/domain/transformers/documentType.transform";
import {CountryTransformer} from "@location/domain/transformers/country.transform";
import {StatusTransformer} from "@status/domain/transformers/Status.transformer";

export interface DocumentTypeProps {
    id?: number;
    description: string;
    country: string
    status: string;
}

export class DocumentTypeEntity extends EntityBase<DocumentTypeProps> {
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
            country: CountryTransformer.normalizeDescription(props.country),
            status: StatusTransformer.normalizeDescription(props.status),
        };
        super(normalizedProps);
        this.validateRequiredFields(['description', 'country', 'status']);
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

    get country(): string {
        return this.props.country;
    }

    get status(): string {
        return this.props.status;
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
    public update(props: Partial<DocumentTypeProps>): this {
        return this.cloneWith(props);
    }

    //#endregion
}