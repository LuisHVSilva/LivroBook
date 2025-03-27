export class UserTypeDomainService {
    static ensureUniqueDescription(description: string, count: number): void {
        if (count > 0) {
            throw new Error("Este tipo de usuário já existe.");
        }
    }
}
