import "reflect-metadata"
import {inject, injectable} from "tsyringe";
import {IStatusRepository} from "../../application/ports/IStatusRepository";
import {StringUtils} from "@coreShared/utils/StringUtils";
import {Status} from "../status";
import {IStatusValidator} from "./IStatusValidator";
import {Messages} from "@coreShared/constants/messages";
import {Result} from "@coreShared/types/Result";
import {ValidateError} from "@coreShared/errors/ValidateError";


@injectable()
export class StatusValidator implements IStatusValidator {
    private readonly className: string = "StatusValidator";

    constructor(@inject("IStatusRepository") private readonly statusRepository: IStatusRepository) {
    }

    public async validateUniqueDescription(description: string): Promise<void> {
        const descriptionFormatted: string = StringUtils.transformCapitalLetterWithoutAccent(description);
        const existingStatus: Result<Status> = await this.statusRepository.findByDescription(descriptionFormatted);

        if (existingStatus.isSuccessful()) {
            throw new ValidateError(this.className, Messages.Status.Error.DUPLICATE_DESCRIPTION);
        }
    };

    public async validateExistingStatus(id: number): Promise<void> {
        const existingStatus: Result<Status> = await this.statusRepository.findById(id);

        if (existingStatus.isFailure()) {
            throw new ValidateError(this.className, Messages.Status.Error.INVALID_ID(id.toString()));
        }
    };
}
