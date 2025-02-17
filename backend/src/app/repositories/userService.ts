// Imports
import { StatusCodes } from 'http-status-codes';
import { WhereOptions } from 'sequelize';
import { User } from '../../models/User';
import { Logger } from '../../utils/logger';
import { IUserRepository } from '../interface/Repository/IUserRepository';

class UserRepository implements IUserRepository {
    private log: Logger

    constructor() {
        this.log = new Logger();
    }

    async getAllUsers(): Promise<User[] | Error> {
        try {
            return await User.findAll();
        } catch (error) {
            this.log.logError("getAllUsers", StatusCodes.INTERNAL_SERVER_ERROR, error as Error);

            return new Error("Erro ao buscar todos os usuários")             
        }
    };

    async getUserByCriteria(filters: WhereOptions<User>): Promise<User | null> {
        try {
            return await User.findOne({ where: filters }); // Filtros dinâmicos
        } catch (error) {
            this.log.logError("getUserByCriteria", StatusCodes.INTERNAL_SERVER_ERROR, error as Error);

            return null; // Retorna null em caso de erro
        }
    }

    async createUser(userData: User): Promise<User | Error> {
        try {
            return await User.create(userData);
        } catch (error) {
            this.log.logError("createUser", StatusCodes.INTERNAL_SERVER_ERROR, error as Error);
            
            return new Error("Erro ao criar usuário")            
        }
    };
}



export { UserRepository };
