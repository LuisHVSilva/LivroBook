import {StateEnum} from "@coreShared/enums/StateEnum";
import {Messages} from "@coreShared/constants/messages";
import {StringUtils} from "@coreShared/utils/StringUtils";

export class Status {
    private readonly id: number | null;
    private readonly description: string;
    private readonly active: StateEnum;

    private constructor(id: number | null, description: string, active: StateEnum) {
        this.id = id;
        this.description = description;
        this.active = active;

        this.validate();
    }

    // Getters
    public getId(): number | null {
        return this.id;
    }

    public getDescription(): string {
        return this.description;
    }

    public getActive(): StateEnum {
        return this.active;
    }

    public isActive(): boolean {
        return this.active === StateEnum.ACTIVE;
    }

    // Validations
    private validate(): void {
        this.validateDescriptionLength();
    }

    private validateDescriptionLength(): void {
        if (this.description.length <= 3) {
            throw new Error(Messages.Status.Error.INVALID_DESCRIPTION);
        }
    }

    // Factory Method
    public static create(description: string): Status {
        const formattedDescription: string = StringUtils.transformCapitalLetterWithoutAccent(description);
        return new Status(null, formattedDescription, StateEnum.INACTIVE);
    }

    public updateDescription(newDescription: string): Status {
        const formattedDescription: string = StringUtils.transformCapitalLetterWithoutAccent(newDescription);

        return new Status(this.id, formattedDescription, this.active);
    }

    public activate(): Status {
        return new Status(this.id, this.description, StateEnum.ACTIVE);
    }

    public deactivate(): Status {
        return new Status(this.id, this.description, StateEnum.INACTIVE);
    }

    public toJSON(): Record<string, unknown> {
        return {
            id: this.id,
            description: this.description,
            active: this.active,
        };
    }

    public static restore(data: { id: number, description: string; active: StateEnum }): Status {
        return new Status(data.id, data.description, data.active);
    }
}