import {Status} from "../../domain/status";


export interface IStatusRepository {
    /**
     * Search for a Status by its ID.
     *
     * @param id - The Status ID to fetch.
     * @returns A Status object if found, or null if not.
     */
    findById(id: number): Promise<Status | null>;

    /**
     * Search for a Status by its description.
     *
     * @param description - The description of the Status to be searched for.
     * @returns A Status object if found, or null if not.
     */
    findByDescription(description: string): Promise<Status | null>;

    /**
     * Saves a new Status or updates an existing Status.
     *
     * @param status - The Status object to save or update.
     * @returns The Status that was saved or updated.
     */
    save(status: Status): Promise<Status>;
}