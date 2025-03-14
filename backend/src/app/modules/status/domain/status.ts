import {StateEnum} from "@coreShared/enums/StateEnum";
import {Messages} from "@coreShared/constants/messages";

export class Status {
    private readonly id?: number;
    private readonly description: string;
    private readonly active: StateEnum;

    private constructor(description: string, active: StateEnum, id?: number) {
        this.validateDescriptionLength(description);
        this.id = id;
        this.description = description;
        this.active = active;
    }

    // Getters
    public getId(): number | undefined {
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
    private validateDescriptionLength(description: string): void {
        if (description.length <= 3) {
            throw new Error(Messages.Status.Error.INVALID_DESCRIPTION);
        }
    }

    // Factory Method
    public static create(description: string): Status {
        return new Status(description, StateEnum.INACTIVE, undefined);
    }

    public updateDescription(newDescription: string): Status {
        return new Status(newDescription, this.active, this.id);
    }

    public activate(): Status {
        return new Status(this.description, StateEnum.ACTIVE, this.id);
    }

    public deactivate(): Status {
        return new Status(this.description, StateEnum.INACTIVE, this.id);
    }

    public toJSON(): Record<string, unknown> {
        return {
            description: this.description,
            active: this.active,
            id: this.id
        };
    }

    public static restore(data: { description: string; active: StateEnum, id: number }): Status {
        return new Status(data.description, data.active, data.id);
    }
}