import {Status} from "../../domain/status";
import {Result} from "@coreShared/types/Result";
import {Transaction} from 'sequelize';

export interface IStatusRepository {
    startTransaction(): Promise<Transaction>;

    /**
     * Saves a new status.
     *
     * @param statusToSave - The new status
     * @returns The status that was saved.
     */
    save(statusToSave: Status): Promise<Result<Status>>;

    /**
     * Search for a status by its ID.
     *
     * @param id - The status ID to fetch.
     * @returns A status object if found.
     */
    findById(id: number): Promise<Result<Status>>;

    /**
     * Search for a status by its description.
     *
     * @param description - The description of the status to be searched for.
     * @returns A status object if found.
     */
    findByDescription(description: string): Promise<Result<Status>>;

    /**
     * Update status description.
     *
     * @param updatedStatus - The status to be updated.
     */
    updateDescription(updatedStatus: Status): Promise<void>;

    /**
     * Update status state.
     *
     * @param statusToSave - The status to be updated.
     */
    updateActive(statusToSave: Status): Promise<void>;
}