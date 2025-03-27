import {Status} from "@status/domain/status";
import {Messages} from "@coreShared/messages/messages";
import {StringUtils} from "@coreShared/utils/StringUtils";
import {CreateUserTypeOutputDTO} from "@userType/adapters/dtos/createUserTypeDTO";

export class UserType {
    private static readonly MIN_DESCRIPTION_LENGTH: number = 4;
    private static readonly USER_TYPE_DEFAULT_STATUS_DESCRIPTION : string = "PENDENTE DE APROVACAO";

    private readonly _id: number | null;
    private readonly _description: string;
    private readonly _status: Status;

    constructor(id: number | null, description: string, status: Status) {
        this._id = id;
        this._description = StringUtils.transformCapitalLetterWithoutAccent(description);
        this._status = status;

        this.validate();
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

    static get createEntityStatusDescription() : string {
        return UserType.USER_TYPE_DEFAULT_STATUS_DESCRIPTION ;
    }
    //#endregion

    //#region Validations
    private validate(): void {
        this.validateDescriptionLength();
        this.validateHasAssociatedStatus();
    }

    private validateHasAssociatedStatus(): void {
        if(!this.status) {
            throw new Error(Messages.UserType.Error.STATUS_ASSOCIATE);
        }
    }

    private validateDescriptionLength(): void {
        if (this._description.length < UserType.MIN_DESCRIPTION_LENGTH) {
            throw new Error(Messages.UserType.Error.INVALID_DESCRIPTION(UserType.MIN_DESCRIPTION_LENGTH));
        }
    }

    private static isValidInitialStatus(status: Status): boolean {
        return status.getDescription().trim().toUpperCase() === UserType.USER_TYPE_DEFAULT_STATUS_DESCRIPTION ;
    }
    //#endregion

    //#region Factory Method

    // Every creation of a new UserType must start with the status PENDING APPROVAL
    public static create(description: string, status: Status): UserType {
        if (!UserType.isValidInitialStatus(status)) {
            throw new Error(
                Messages.UserType.Error.CREATE_ENTITY_STATUS_ASSOCIATION(
                    UserType.USER_TYPE_DEFAULT_STATUS_DESCRIPTION ,
                    status.getDescription()
                )
            );
        }

        return new UserType(null, description, status);
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

    public static restore(data: {id: number, description: string, status:Status}): UserType{
        return new UserType(data.id, data.description, data.status);
    }
    //#endregion

    //#region DTO
    public getCreateOutputDTO(): CreateUserTypeOutputDTO {
        return {
            message: Messages.UserType.Success.CREATED(this.description),
            id: this.id!.toString(),
            description: this.description,
            status: this.status.getDescription()
        }
    }
    //#endregion
}