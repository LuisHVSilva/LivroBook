import {StatusPayload} from "@payloads/statusPayload";
import {Status} from "@status/domain/status";
import {StringUtils} from "@coreShared/utils/StringUtils";
import {UserType} from "@userType/domain/userType";

export class UserTypePayload {
    private readonly _id: number = 1;
    private readonly _description: string = "DESCRIPTION";
    private readonly _statusId: number = 1;
    private readonly _status: Status = StatusPayload.createMock().toEntity();


    constructor(id: number, description: string, statusId: number, status: Status) {
        this._id = id;
        this._description = StringUtils.transformCapitalLetterWithoutAccent(description);
        this._statusId = statusId;
        this._status = status;
    }


    get id(): number {
        return this._id;
    }

    get description(): string {
        return this._description;
    }

    get statusId(): number {
        return this._statusId;
    }

    get status(): Status {
        return this._status;
    }

    static createMock(overrides?: Partial<{ id: number; description: string; statusId: number; status: Status }>): UserTypePayload {
        return new UserTypePayload(
            overrides?.id ?? 1,
            overrides?.description ?? "UserType",
            overrides?.statusId ?? 1,
            overrides?.status ?? StatusPayload.createMock().toEntity()
        );
    }

    public toEntity(): UserType {
        return UserType.restore({
                id: this.id,
                description: this.description,
                status: this.status,
            }
        );
    }

    public model(): UserTypePayload {
        return {
            id: this.id,
            description: this.description,
            statusId: this.statusId,
            status: this.status,
        } as UserTypePayload;
    }
}