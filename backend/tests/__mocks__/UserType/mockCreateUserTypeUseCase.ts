import {StatusPayload} from "@payloads/statusPayload";
import {Result} from "@coreShared/types/Result";
import {StatusMessages} from "@coreShared/messages/statusMessages";
import {ICreateUserTypeUseCase} from "@userType/application/createUserType/ICreateUserTypeUseCase";
import {UserTypePayload} from "@payloads/userTypePayload";
import {CreateUserTypeOutputDTO} from "@userType/adapters/dtos/createUserTypeDTO";

export class MockCreateUserTypeUseCase {
    private readonly _useCase: jest.Mocked<ICreateUserTypeUseCase>;
    private readonly _userTypePayloadMock: UserTypePayload = UserTypePayload.createMock();

    constructor() {
        this._useCase = {
            execute: jest.fn()
        };
    };

    get mock(): jest.Mocked<ICreateUserTypeUseCase> {
        return this._useCase;
    };

    public withExecute(): this {
        const result: Result<CreateUserTypeOutputDTO> = Result.success<CreateUserTypeOutputDTO>({
            message: StatusMessages.Success.Creation(this._userTypePayloadMock.description),
            id: this._userTypePayloadMock.id.toString(),
            description: this._userTypePayloadMock.description,
            status: StatusPayload.createMock().description,
        });

        this._useCase.execute.mockResolvedValueOnce(result);
        return this;
    };

    public withExecuteError(error: any): this {
        this._useCase.execute.mockRejectedValue(error);
        return this;
    };
}