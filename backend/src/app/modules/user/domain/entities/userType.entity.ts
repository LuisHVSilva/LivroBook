import {BaseEntity} from "@coreShared/base/baseEntity";
import {StringUtil} from "@coreShared/utils/string.util";

export interface UserTypeProps {
    id?: number;
    description: string;
    statusId: number;
}

export class UserTypeEntity extends BaseEntity<UserTypeProps> {
    private readonly _id: number | undefined;
    private readonly _description: string ;
    private readonly _status: number;

    private constructor(props: UserTypeProps) {
        super(props);

        this.validateRequiredFields(['description', 'statusId']);

        this._id = props.id;
        this._description = StringUtil.transformCapitalLetterWithoutAccent(props.description);
        this._status = props.statusId;

        this.validate();
    }

    get id(): number | undefined {
        return this._id;
    }

    get description(): string {
        return this._description;
    }

    get statusId(): number {
        return this._status;
    }

    private validate(): void {
        this.validateDescriptionLength();
    }

    private validateDescriptionLength(): void {
        if (this._description.length <= 5) {
            throw new Error("Description length must be at least 5 characters long");
        }

        if (this._description.length > 50) {
            throw new Error("Description length must not exceed 50 characters");
        }
    }

    public static create(props: UserTypeProps): UserTypeEntity {
        return new UserTypeEntity(props);
    }

    public updateDescription(description: string): this {
        const updatedProps: Partial<UserTypeProps> = {description};
        return this.cloneWith(updatedProps);
    }

    public updateStatusId(statusId: number): this {
        const updatedProps: Partial<UserTypeProps> = {statusId};
        return this.cloneWith(updatedProps);
    }

    public toJSON(): Record<string, unknown> {
        return {
            id: this._id,
            description: this._description,
            statusId: this._status
        };
    }

}