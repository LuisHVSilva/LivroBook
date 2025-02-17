import { Status } from "../../../models/Status";
import { CreateStatusDTO } from "../DTO/CreateStatusDTO";

export interface IStatusRepository {
    /**
     * Busca todos os registros de status.
     * @returns Uma promessa que resolve para uma lista de Status ou um erro.
     */
    getAllStatus(): Promise<Status[] | Error>;

    /**
     * Cria um novo status.
     * @param statusData - Os dados do status a serem criados.
     * @returns Uma promessa que resolve para o novo status criado ou um erro.
     */
    createStatus(statusData: CreateStatusDTO): Promise<Status | Error>;
}
