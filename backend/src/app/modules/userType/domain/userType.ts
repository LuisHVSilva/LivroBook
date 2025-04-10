import {Status} from "@status/domain/status";
import {StringUtils} from "@coreShared/utils/StringUtils";
import {IUserTypeDomainService} from "@userType/domain/service/IUserTypeDomainService";
import {IStatusDomainService} from "@status/domain/service/IStatusDomainService";

export class UserType {
    private static readonly USER_TYPE_DEFAULT_STATUS_DESCRIPTION: string = "PENDENTE DE APROVACAO";

    private readonly _id: number | null;
    private readonly _description: string;
    private readonly _status: Status;

    constructor(id: number | null, description: string, status: Status) {
        this._id = id;
        this._description = StringUtils.transformCapitalLetterWithoutAccent(description);
        this._status = status;
    }

    //#region Getters
    get id(): number | null {
        return this._id;
    }

    get description(): string {
        return this._description;
    }

    get status(): Status {
        return this._status;
    }

    static get createEntityStatusDescription(): string {
        return UserType.USER_TYPE_DEFAULT_STATUS_DESCRIPTION;
    }

    //#endregion

    //#endregion

    //#region Factory Method

    // Every creation of a new UserType must start with the status PENDING APPROVAL
    public static async create(
        description: string,
        userTypeDomainService: IUserTypeDomainService,
        statusDomainService: IStatusDomainService
    ): Promise<UserType> {
        const status: Status = await statusDomainService.getPendingApprovalStatus();
        const newUserType: UserType = new UserType(null, description, status);
        await userTypeDomainService.ensureDescriptionIsUnique(description);
        return newUserType;
    }

    public updateDescription(description: string): UserType {
        return new UserType(this.id, description, this.status);
    }

    public updateStatus(status: Status): UserType {
        return new UserType(this.id, this.description, status);
    }

    public toJSON(): Record<string, unknown> {
        return {
            id: this._id,
            description: this._description,
            status: Status.restore({
                id: this.status.getId()!,
                description: this.status.getDescription(),
                active: this.status.getActive(),
            }).toJSON()
        }
    }

    public static restore(data: { id: number, description: string, status: Status }): UserType {
        return new UserType(data.id, data.description, data.status);
    }

    //#endregion

    //#endregion
}