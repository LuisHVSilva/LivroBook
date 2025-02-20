import { CreateStatusDTO } from "../DTO/CreateStatusDTO";
import { IStatusEntity } from "../Entities/IStatusEntity";
import { RepositoryResult } from "../../types/Result";


export interface IStatusRepository {
    /**
     * Cria um novo status.
     * @param statusData - Os dados do status a serem criados.
     * @returns Uma promessa que resolve para o novo status criado ou um erro.
     */
    create(statusData: CreateStatusDTO): Promise<RepositoryResult<IStatusEntity>>;

    /**
     * Busca todos os registros de status.
     * @returns Uma promessa que resolve para uma lista de Status ou um erro.
     */
    getAll(): Promise<RepositoryResult<IStatusEntity[]>>;

    /**
     * Busca um registro de status baseado no ID.
     * @returns Uma promessa que resolve para uma lista de Status ou um erro.
     */
    getById(id: bigint): Promise<RepositoryResult<IStatusEntity>>;

    /**
     * Busca todos os registros de status.
     * @returns Uma promessa que resolve para uma lista de Status ou um erro.
     */
    deleteById(id: bigint): Promise<RepositoryResult<number>>;

}
