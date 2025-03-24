import {Status} from "@status/domain/status";

export interface IStatusValidator {

    /**
     * Validates whether there is a status description already registered in the database
     *
     * @param description - the description that should be checked.
     * @returns A Promise resolving to `void` if the description is unique or an error if it exists
     */
    validateUniqueDescription(description: string): Promise<void>;

    validateExistingStatus(id: number): Promise<Status>;
}