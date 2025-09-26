import {EntityBase} from "@coreShared/base/entity.base";
import {LanguageTransform} from "@modules/book/domain/transformers/language.transform";
import {LanguageValidator} from "@modules/book/domain/validators/language.validator";

export interface LanguageProps {
    id?: number;
    description: string;
    statusId: number;
}

export class LanguageEntity extends EntityBase<LanguageProps> {
    //#region PROPERTIES
    public static readonly MIN_DESC: number = 4;
    public static readonly MAX_DESC: number = 50;
    //#endregion

    //#region CONSTRUCTOR
    constructor(props: LanguageProps) {
        const normalizedProps: LanguageProps = {
            ...props,
            description: LanguageTransform.normalizeDescription(props.description),
        };
        super(normalizedProps);
        this.validateRequiredFields(['description', 'statusId']);
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

    get statusId(): number {
        return this.props.statusId;
    }

    //#endregion

    //#region VALIDATIONS
    private validate(): void {
        LanguageValidator.validateDescriptionLength(this.props.description, LanguageEntity.MIN_DESC, LanguageEntity.MAX_DESC);
    }

    //#endregion

    //#region CREATE
    public static create(props: LanguageProps): LanguageEntity {
        return new LanguageEntity(props);
    }

    //#endregion

    //#region UPDATES
    public update(props: Partial<LanguageProps>): this {
        return this.cloneWith(props);
    }

    //#endregion
}