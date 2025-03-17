import "reflect-metadata"
import {inject, injectable} from "tsyringe";
import {IStatusRepository} from "../../application/ports/IStatusRepository";
import {StringUtils} from "@coreShared/utils/StringUtils";
import {Status} from "../status";
import {IStatusValidator} from "./IStatusValidator";
import {Messages} from "@coreShared/constants/messages";
import {Result} from "@coreShared/types/Result";

class StatusValidationError extends Error {
    constructor(message: string) {
        super(message);
        this.name = "StatusValidationError";
    }
}

@injectable()
export class StatusValidator implements IStatusValidator {

    constructor(@inject("IStatusRepository") private readonly statusRepository: IStatusRepository) {
    }

    public async validateUniqueDescription(description: string): Promise<void> {
        const descriptionFormatted: string = StringUtils.transformCapitalLetterWithoutAccent(description);
        const existingStatus: Result<Status> = await this.statusRepository.findByDescription(descriptionFormatted);

        if (existingStatus.isSuccessful()) {
            throw new StatusValidationError(Messages.Status.Error.DUPLICATE_DESCRIPTION);
        }
    };
}
