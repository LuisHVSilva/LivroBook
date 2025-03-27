import {Status} from "@status/domain/status";

export interface IStatusDomainService {
    getPendingApprovalStatus(): Promise<Status>;
    ensureDescriptionIsUnique (description: string): Promise<void>;
    ensureStatusExists(id: number): Promise<Status>;
}