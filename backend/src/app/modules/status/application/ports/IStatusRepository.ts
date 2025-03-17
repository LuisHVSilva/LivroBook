import {Status} from "../../domain/status";
import {Result} from "@coreShared/types/Result";
import {Transaction} from 'sequelize';

export interface IStatusRepository {
    startTransaction(): Promise<Transaction>;

    /**
     * Saves a new Status.
     *
     * @param statusToSave - The new Status
     * @returns The Status that was saved.
     */
    save(statusToSave: Status): Promise<Result<Status>>;

    /**
     * Search for a Status by its ID.
     *
     * @param id - The Status ID to fetch.
     * @returns A Status object if found.
     */
    findById(id: number): Promise<Result<Status>>;

    /**
     * Search for a Status by its description.
     *
     * @param description - The description of the Status to be searched for.
     * @returns A Status object if found.
     */
    findByDescription(description: string): Promise<Result<Status>>;

    /**
     * Update Status description.
     *
     * @param updatedStatus - The description of the Status to be searched for.
     */
    updateDescription(updatedStatus: Status): Promise<void>;
}