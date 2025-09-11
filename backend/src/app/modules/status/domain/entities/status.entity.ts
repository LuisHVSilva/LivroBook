import { EntityBase } from '@coreShared/base/entity.base';
import {StatusTransformer} from "@status/domain/transformers/Status.transformer";
import {StatusValidator} from "@status/domain/validators/status.validator";

export interface StatusProps {
    id?: number;
    description: string;
    active: boolean;
}

export class StatusEntity extends EntityBase<StatusProps> {
    //#region PROPERTIES
    public static readonly MIN_DESC: number = 3;
    public static readonly MAX_DESC: number = 50;
    public static readonly ENTITY_NAME: string = 'status';
    //#endregion

    //#region CONSTRUCTORS
    private constructor(props: StatusProps) {
        const normalizedProps: StatusProps = {
            ...props,
            description: StatusTransformer.normalizeDescription(props.description),
        };

        super(normalizedProps);

        this.validateRequiredFields(['description', 'active']);
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

    get active(): boolean {
        return this.props.active;
    }

    //#endregion

    //#region VALIDATIONS
    private validate(): void {
        StatusValidator.validateDescriptionLength(this.props.description, StatusEntity.MIN_DESC, StatusEntity.MAX_DESC);
    }
    //#endregion

    //#region CREATE
    public static create(data: StatusProps): StatusEntity {
        return new StatusEntity(data);
    }
    //#endregion

    //#region UPDATES
    public update(props: Partial<StatusProps>): this {
        let updated = this.cloneWith(props);

        if (props.description !== undefined) {
            updated = updated.updateDescription(props.description);
        }

        if (props.active !== undefined) {
            updated = props.active ? updated.activate() : updated.deactivate();
        }

        return updated;
    }

    public updateDescription(description: string): this {
        const updatedProps: Partial<StatusProps> = { description };
        return this.cloneWith(updatedProps);
    }

    public activate(): this {
        const updatedProps: Partial<StatusProps> = { active: true };
        return this.cloneWith(updatedProps);
    }

    public deactivate(): this {
        const updatedProps: Partial<StatusProps> = { active: false };
        return this.cloneWith(updatedProps);
    }
    //#endregion
}