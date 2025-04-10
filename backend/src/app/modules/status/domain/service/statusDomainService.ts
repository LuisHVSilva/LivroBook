import "reflect-metadata"
import {Status} from "@status/domain/status";
import {Result} from "@coreShared/types/Result";
import {inject, injectable} from "tsyringe";
import {IStatusDomainService} from "@status/domain/service/IStatusDomainService";
import {IStatusRepository} from "@status/infrastructure/repositories/IStatusRepository";
import {ValidateError} from "@coreShared/errors/ValidateError";
import {StatusMessages} from "@coreShared/messages/statusMessages";
import {StateEnum} from "@coreShared/enums/StateEnum";

@injectable()
export class StatusDomainService implements IStatusDomainService {

    //#region constants

    private readonly className: string = "StatusDomainService";

    //#endregion

    constructor(@inject("IStatusRepository") private readonly statusRepository: IStatusRepository) {
    }

    //#region methods

    public async getPendingApprovalStatus(): Promise<Status> {
        const pendingApproval: string = "PENDENTE DE APROVAÇÃO";
        const status: Result<Status> = await this.statusRepository.findByDescription(pendingApproval);
        if (status.isNone()) {
            throw new ValidateError(this.className, StatusMessages.Error.Validation.PENDING_APPROVAL_STATUS_NOT_FOUND);
        }

        const foundedStatus = status.unwrapOrThrow(Status.restore);

        if (foundedStatus.getActive() === StateEnum.INACTIVE) {
            throw new ValidateError(this.className, StatusMessages.Error.Validation.PENDING_APPROVAL_STATUS_INACTIVE);
        }

        return foundedStatus;
    }

    public async ensureDescriptionIsUnique(description: string): Promise<void> {
        const existingStatus: Result<Status> = await this.statusRepository.findByDescription(description);
        if (existingStatus.isSuccess()) {
            throw new ValidateError(this.className, StatusMessages.Error.Validation.DUPLICATE_DESCRIPTION);
        }
    };

    public async ensureStatusExists(id: number): Promise<Status> {
        const existingStatus: Result<Status> = await this.statusRepository.findById(id);

        if (existingStatus.isNone() || existingStatus.isFailure()) {
            throw new ValidateError(this.className, StatusMessages.Error.Validation.STATUS_NOT_FOUND);
        }

        return existingStatus.unwrapOrThrow(Status.restore);
    };

    //#endregion
}
