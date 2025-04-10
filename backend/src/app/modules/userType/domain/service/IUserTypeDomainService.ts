export interface IUserTypeDomainService {
    ensureDescriptionIsUnique(description: string): Promise<void>;
}