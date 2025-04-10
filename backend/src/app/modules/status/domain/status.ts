import {StateEnum} from "@coreShared/enums/StateEnum";
import {StatusMessages} from "@coreShared/messages/statusMessages";
import {StringUtils} from "@coreShared/utils/StringUtils";
import {IStatusDomainService} from "@status/domain/service/IStatusDomainService";
import {DomainError} from "@coreShared/errors/domainError";

export class Status {
    private readonly id: number | null;
    private readonly description: string;
    private readonly active: StateEnum;
    private readonly domainName: string = "Status";

    private constructor(id: number | null, description: string, active: StateEnum) {
        this.id = id;
        this.description = StringUtils.transformCapitalLetterWithoutAccent(description);
        this.active = active;

        this.validate();
    }


    //#region Getters
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

    //#endregion

    //#region Validations
    private validate(): void {
        this.validateDescriptionLength();
    }

    private validateDescriptionLength(): void {
        if (this.description.length <= 3) {
            throw new DomainError(this.domainName, StatusMessages.Error.Validation.INVALID_DESCRIPTION_LEN);
        }
    }

    //#endregion

    //#region Factory Method

    public static async create(description: string, statusDomainService: IStatusDomainService): Promise<Status> {
        const newStatus: Status = new Status(null, description, StateEnum.INACTIVE);
        await statusDomainService.ensureDescriptionIsUnique(newStatus.description);
        return newStatus;
    }

    public async updateDescription(newDescription: string, statusDomainService: IStatusDomainService): Promise<Status> {
        const updatedStatus: Status = new Status(this.id, newDescription, this.active);
        await statusDomainService.ensureDescriptionIsUnique(updatedStatus.description);
        return updatedStatus;
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

    ///#endregion
}