import {IUpdateDescriptionUseCase} from "@status/application/updateDescription/IUpdateDescriptionUseCase";
import {UpdateDescriptionResponseDTO} from "@status/adapters/dtos/UpdateDescriptionDTO";
import {Result} from "@coreShared/types/Result";
import {UseCaseError} from "@coreShared/errors/useCaseError";
import {StatusMessages} from "@coreShared/messages/statusMessages";

export class MockUpdateDescriptionUseCase {
    private readonly updateDescriptionUseCaseMock: jest.Mocked<IUpdateDescriptionUseCase>;

    constructor() {
        this.updateDescriptionUseCaseMock = {
            execute: jest.fn(),
        }
    };

    get mock(): jest.Mocked<IUpdateDescriptionUseCase> {
        return this.updateDescriptionUseCaseMock;
    };

    public withExecute(newDescription: string, oldDescription: string): this {
        const result: Result<UpdateDescriptionResponseDTO> =  Result.success({
            message:  StatusMessages.Success.Update(oldDescription, newDescription),
            newDescription: newDescription
        })

        this.updateDescriptionUseCaseMock.execute.mockResolvedValueOnce(result);
        return this;
    };

    public withExecuteError(error: UseCaseError): this {
        this.updateDescriptionUseCaseMock.execute.mockRejectedValueOnce(error);
        return this;
    }
}