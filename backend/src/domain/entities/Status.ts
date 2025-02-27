import { StatusEnum } from "../enums/StatusEnum";

class Status {
    private readonly _id?: number;
    private _description: string;
    private _active: StatusEnum;

    constructor(description: string, active: StatusEnum = StatusEnum.PENDING, id?: number) {
        this.validateDescription(description);
        this._id = id;
        this._description = description;
        this._active = active;
    }

    get id(): number | undefined {
        return this._id;
    }

    get description(): string {
        return this._description;
    }

    get active(): StatusEnum {
        return this._active;
    }

    private validateDescription(description: string): void {
        if (!description || description.trim().length < 3) {
            throw new Error("A descrição deve ter pelo menos 3 caracteres.");
        }
    }

    public updateDescription(newDescription: string): void {
        this.validateDescription(newDescription);
        this._description = newDescription;
    }

    public activate(): void {
        if (this._active !== StatusEnum.ACTIVE) {
            this._active = StatusEnum.ACTIVE;
        }
    }

    public deactivate(): void {
        if (this._active !== StatusEnum.INACTIVE) {
            this._active = StatusEnum.INACTIVE;
        }
    }

    public pending(): void {
        if (this._active !== StatusEnum.PENDING) {
            this._active = StatusEnum.PENDING;
        }
    }

    public isActive(): boolean {
        return this._active === StatusEnum.ACTIVE;
    }
}

export { Status };
