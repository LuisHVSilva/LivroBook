import {StateEnum} from "../../../../core/shared/enums/StateEnum";
import {Messages} from "../../../../core/shared/constants/messages";

class Status {
    private readonly id?: number;
    private readonly description: string;
    private readonly active: StateEnum;

    private constructor(id: number | undefined, description: string, active: StateEnum) {
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
        return new Status(undefined, description, StateEnum.INACTIVE);
    }

    public updateDescription(newDescription: string): Status {
        return new Status(this.id, newDescription, this.active);
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
            active: this.active
        };
    }

    public static restore(data: { id: number; description: string; active: StateEnum }): Status {
        return new Status(data.id, data.description, data.active);
    }
}

export {Status};
