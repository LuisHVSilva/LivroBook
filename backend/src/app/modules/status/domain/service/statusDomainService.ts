import {Status} from "@status/domain/status";
import {Result} from "@coreShared/types/Result";
import {inject, injectable} from "tsyringe";
import {IStatusDomainService} from "@status/domain/service/IStatusDomainService";
import {IStatusRepository} from "@status/infrastructure/repositories/IStatusRepository";
import {StringUtils} from "@coreShared/utils/StringUtils";
import {ValidateError} from "@coreShared/errors/ValidateError";
import {StatusMessages} from "@coreShared/messages/statusMessages";

@injectable()
export class StatusDomainService implements IStatusDomainService {

    //#region messages

    private readonly className: string = "StatusDomainService";

    //#endregion

    constructor(@inject("IStatusRepository") private statusRepository: IStatusRepository) {}

    //#region methods

    public async getPendingApprovalStatus(): Promise<Status> {
        const pendingApproval:string = "PENDENTE DE APROVAÇÃO";

        const status: Result<Status> = await this.statusRepository.findByDescription(pendingApproval);

        if (status.isFailure()) {
            throw new ValidateError(this.className, StatusMessages.Error.Validation.PENDING_APPROVAL_STATUS);
        }

        return status.getValue();
    }

    public async ensureDescriptionIsUnique (description: string): Promise<void> {
        const descriptionFormatted: string = StringUtils.transformCapitalLetterWithoutAccent(description);
        const existingStatus: Result<Status> = await this.statusRepository.findByDescription(descriptionFormatted);

        if (existingStatus.isSuccessful()) {
            throw new ValidateError(this.className, StatusMessages.Error.Validation.DUPLICATE_DESCRIPTION);
        }
    };

    public async ensureStatusExists(id: number): Promise<Status> {
        const existingStatus: Result<Status> = await this.statusRepository.findById(id);

        if (existingStatus.isFailure()) {
            throw new ValidateError(this.className, existingStatus.getError());
        }

        return existingStatus.getValue();
    };

    //#endregion
}
