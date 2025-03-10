import {StateEnum} from "@coreShared/enums/StateEnum"
import {Status} from "@status/domain/status";
import {StringUtils} from "@coreShared/utils/StringUtils";

export class StatusPayload {
    private static _id: number = 1;
    private static _validDescription: string = "Status Valido";
    private static _invalidDescription: string = "Abc";
    private static _active: StateEnum = StateEnum.ACTIVE;
    private static _inactive: StateEnum = StateEnum.INACTIVE;

    // Getters
    public static get id(): number {
        return this._id;
    }

    public static get validDescription(): string {
        return this._validDescription;
    }

    public static get invalidDescription(): string {
        return this._invalidDescription;
    }

    public static get active(): StateEnum {
        return this._active;
    }

    public static get inactive(): StateEnum {
        return this._inactive;
    }

    public static get validDescriptionFormatted(): string {
        return StringUtils.transformCapitalLetterWithoutAccent(this._validDescription);
    }

    public static get invalidDescriptionFormatted(): string {
        return StringUtils.transformCapitalLetterWithoutAccent(this._invalidDescription);
    }

    public static validStatusBuild(): { description: string, active: StateEnum, id: number } {
        return {description: this.validDescriptionFormatted, active: this._active, id: this._id};
    }

    public static inactiveStatusBuild(): { description: string, active: StateEnum, id: number } {
        return {description: this.validDescriptionFormatted, active: this._inactive, id: this._id};
    }

    public static validActiveStatus(): Status {
        return Status.restore(this.validStatusBuild());
    };

    public static validInactiveStatus(): Status {
        return Status.restore(this.inactiveStatusBuild());
    };

    public static invalidStatus(): Status {
        return Status.create(this._invalidDescription);
    }

    public static statusLiteralObject(): { id: number, description: string, active: StateEnum} {
        return {
            id: this.id,
            description: this.validDescriptionFormatted,
            active: this.active
        }
    }


}