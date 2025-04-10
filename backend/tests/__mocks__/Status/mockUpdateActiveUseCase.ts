import {IUpdateActiveUseCase} from "@status/application/updateActive/IUpdateActiveUseCase";
import {Result} from "@coreShared/types/Result";
import {UpdateActiveResponseDTO} from "@status/adapters/dtos/UpdateActiveDTO";
import {UseCaseError} from "@coreShared/errors/useCaseError";
import {StatusMessages} from "@coreShared/messages/statusMessages";

export class MockUpdateActiveUseCase {
    private readonly updateActiveUseCaseMock: jest.Mocked<IUpdateActiveUseCase>;

    constructor() {
        this.updateActiveUseCaseMock = {
            execute: jest.fn()
        }
    }

    get mock(): jest.Mocked<IUpdateActiveUseCase> {
        return this.updateActiveUseCaseMock;
    }

    public withExecute(): this {
        const result: Result<UpdateActiveResponseDTO> =  Result.success({
            message:  StatusMessages.Success.Activation.DEACTIVATED
        })
        this.updateActiveUseCaseMock.execute.mockResolvedValueOnce(result);

        return this;
    }

    public withExecuteError(error: UseCaseError): this {
        this.updateActiveUseCaseMock.execute.mockRejectedValueOnce(error);
        return this;
    }
}