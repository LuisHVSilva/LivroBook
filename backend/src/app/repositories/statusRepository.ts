import { IStatusRepository } from "../interface/Repository/IStatusRepository";

import { StatusCodes } from 'http-status-codes';
import { WhereOptions } from 'sequelize';
import { Logger } from '../../utils/logger';
import { Status } from "../../models/Status";
import { MESSAGES } from "../../utils/messages";

class StatusRepository implements IStatusRepository {
    private log: Logger

    constructor(logger: Logger) {
        this.log = logger;
    }

    async createStatus(statusData: Status): Promise<Status | Error> {
        try {
            return await Status.create(statusData);
        } catch (err) {
            this.log.logError("createStatus", StatusCodes.INTERNAL_SERVER_ERROR, err as Error);
            return new Error("Erro ao buscar todos os status");
        }
    }

    async getAllStatus(): Promise<Status[] | Error> {
        try {
            return await Status.findAll();
        } catch (err) {
            this.log.logError("getAllUsers", StatusCodes.INTERNAL_SERVER_ERROR, err as Error);
            return new Error(MESSAGES.ERRORS.STATUS_REPOSITORY.GET_ALL_STATUS);
        }
    }

    
}

export { StatusRepository }