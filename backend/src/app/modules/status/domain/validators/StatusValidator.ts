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

    public async validateExistingStatus(id: number): Promise<Status> {
        const existingStatus: Result<Status> = await this.statusRepository.findById(id);

        if (existingStatus.isFailure()) {
            console.log("entrou")
            throw new ValidateError(this.className, existingStatus.getError());
        }

        return existingStatus.getValue();
    };
}
