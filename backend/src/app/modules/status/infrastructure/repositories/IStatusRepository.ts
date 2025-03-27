import {Status} from "../../domain/status";
import {Result} from "@coreShared/types/Result";
import {IBaseRepository} from "@coreShared/interfaces/IBaseRepository";
import {RepositoryError} from "@coreShared/errors/RepositoryError";
import {StateEnum} from "@coreShared/enums/StateEnum";

export interface IStatusRepository extends IBaseRepository<Status, RepositoryError> {
    /**
     * Search for a status by its description.
     *
     * @param description - The description of the status to be searched for.
     * @returns A status object if found.
     */
    findByDescription(description: string): Promise<Result<Status, RepositoryError>>;

    /**
     * Update status description.
     *
     * @param id - The status id to be updated.
     * @param newDescription - The status description to be updated.
     */
    updateDescription(id: number, newDescription: string): Promise<void>;

    /**
     * Update status state.
     *
     * @param id - The status id to be updated.
     * @param newActive - The status active to be updated.
     */
    updateActive(id: number, newActive: StateEnum): Promise<void>;
}