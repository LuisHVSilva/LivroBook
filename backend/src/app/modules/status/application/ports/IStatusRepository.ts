import {Status} from "../../domain/status";

export interface IStatusRepository {
    findById(id: string): Promise<Status>;
    save(status: Status): Promise<Status>;
}