import {Status} from "../../domain/status";


export interface IStatusRepository {
    findById(id: string): Promise<Status | null>;
    findByDescription(description: string): Promise<Status | null>;
    save(status: Status): Promise<Status>;
}