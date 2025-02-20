import { User } from "../../../models/User";
import { CreateUserDTO } from "../DTO/UserDTO";

export interface IUserRepository {
    /**
     * Busca todos os registros de usuários.
     * @returns Uma promessa que resolve para uma lista de Usuários ou um erro.
     */
    getAllUsers(): Promise<User[] | Error>;
    
    /**
     * Busca um usuário com base de uma query de critério.
     * @returns Uma promessa que resolve para um Usuários ou um erro.
     */
    getUserByCriteria(searchCreteria: object): Promise<User | null>;

    /**
     * Cria um registros de usuários.
     * @returns Uma promessa que resolve para uma lista de Usuários ou um erro.
     */
    createUser(userData: CreateUserDTO): Promise<User | Error>;
}
