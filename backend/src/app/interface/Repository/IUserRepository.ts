import { User } from "../../../models/User";


export interface UserRepository {
    getAllUsers(): Promise<User[] | Error>;
    getUserByCriteria(searchCreteria: object): Promise<User | null>;
    createUser(userData: User): Promise<User |Error>;        
 }
