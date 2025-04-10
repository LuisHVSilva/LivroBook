import {IUserTypeDomainService} from "@userType/domain/service/IUserTypeDomainService";
import {ValidateError} from "@coreShared/errors/ValidateError";
import {UserTypeMessages} from "@coreShared/messages/userTypeMessages";

export class MockUserTypeDomainService {
    private readonly _mock: jest.Mocked<IUserTypeDomainService>;

    constructor() {
        this._mock = {
            ensureDescriptionIsUnique: jest.fn(),
        }
    }

    get mock(): jest.Mocked<IUserTypeDomainService> {
        return this._mock;
    }

    public async withEnsureDescriptionIsUnique(): Promise<this> {
        this._mock.ensureDescriptionIsUnique.mockResolvedValueOnce();
        return this;
    }

    public async withEnsureDescriptionIsUniqueError(className: string, description: string): Promise<this> {
        const error = new ValidateError(className, UserTypeMessages.Error.Validation.DUPLICATE_ENTITY(description))
        this._mock.ensureDescriptionIsUnique.mockRejectedValueOnce(error);
        return this;
    }
}