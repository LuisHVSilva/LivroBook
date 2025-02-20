
import { IStatusRepository } from "../interface/Repository/IStatusRepository";
import { StatusCodes } from 'http-status-codes';
import { Logger } from '../../utils/logger';
import { MESSAGES } from "../../utils/messages";
import { CreateStatusDTO } from "../interface/DTO/CreateStatusDTO";
import { IStatusEntity } from "../interface/Entities/IStatusEntity";
import { Status } from "../../models/Status";
import { RepositoryResult } from "../types/Result";


class StatusRepository implements IStatusRepository {
    private logger: Logger;   

    constructor(logger: Logger) {
        this.logger = logger;
    };

    async create(statusData: CreateStatusDTO): Promise<RepositoryResult<IStatusEntity>> {
        try {
            const result = await Status.create({ ...statusData });
            return { success: true, data: result };
        } catch (err) {
            const errorMessage = MESSAGES.ERRORS.STATUS_REPOSITORY.CREATE;
            this.logger.logError("createStatus", StatusCodes.INTERNAL_SERVER_ERROR, err as Error);
            return { success: false, error: errorMessage };
        }
    };

    async getById(id: bigint): Promise<RepositoryResult<IStatusEntity>> {
        let errorMessage = null;
        try {
            const result = await Status.findByPk(id);

            if (!result) {
                errorMessage = MESSAGES.ERRORS.STATUS_REPOSITORY.GET_BY_ID_NOT_FOUND;
                throw new Error(errorMessage)
            }

            return { success: true, data: result };
        } catch (err) {
            errorMessage = errorMessage ? errorMessage : MESSAGES.ERRORS.STATUS_REPOSITORY.GET_BY_ID;
            this.logger.logError("getById", StatusCodes.INTERNAL_SERVER_ERROR, err as Error);
            return { success: false, error: errorMessage };
        }
    };

    async getAll():Promise<RepositoryResult<IStatusEntity[]>> {
        try {
            const result = await Status.findAll();
            
            return { success: true, data: result };
        } catch (err) {
            this.logger.logError("getAll", StatusCodes.INTERNAL_SERVER_ERROR, err as Error);
            
            return { success: false, error: MESSAGES.ERRORS.STATUS_REPOSITORY.GET_ALL_STATUS };
        }
    };

    async deleteById(id: bigint): Promise<RepositoryResult<number>> {
        let errorMessage = null;
        try {
            const result = await Status.destroy({ where: { id: id } });

            if (result === 0) {
                errorMessage = MESSAGES.ERRORS.STATUS_REPOSITORY.DELETE_BY_ID_NOT_FOUND;
                return { success: false, error: errorMessage };
            }

            return { success: true, data: result };
        } catch (err) {
            errorMessage = errorMessage ? errorMessage : MESSAGES.ERRORS.STATUS_REPOSITORY.DELETE;
            this.logger.logError("deleteById", StatusCodes.INTERNAL_SERVER_ERROR, err as Error);
            return { success: false, error: errorMessage };
        }
    };
}

export { StatusRepository }