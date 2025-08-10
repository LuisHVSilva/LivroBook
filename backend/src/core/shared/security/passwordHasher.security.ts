import * as argon2 from 'argon2';

export class PasswordHasherSecurity {
    static async hash(password: string): Promise<string> {
        return await argon2.hash(password);
    }

    static async verify(hash: string, plain: string): Promise<boolean> {
        return await argon2.verify(hash, plain);
    }
}
