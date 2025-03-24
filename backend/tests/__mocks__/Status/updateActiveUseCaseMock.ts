import {IUpdateActiveUseCase} from "@status/application/ports/IUpdateActiveUseCase";
import {Result} from "@coreShared/types/Result";
import {Messages} from "@coreShared/constants/messages";
import {UpdateActiveResponseDTO} from "@status/adapters/dtos/UpdateActiveDTO";
import {UseCaseError} from "@coreShared/errors/UseCaseError";

export class UpdateActiveUseCaseMock {
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
            message:  Messages.Status.Success.ACTIVATED
        })
        this.updateActiveUseCaseMock.execute.mockResolvedValueOnce(result);

        return this;
    }

    public withExecuteError(error: UseCaseError): this {
        this.updateActiveUseCaseMock.execute.mockRejectedValueOnce(error);
        return this;
    }
}