import {IUpdateDescriptionUseCase} from "@status/application/ports/IUpdateDescriptionUseCase";
import {UpdateDescriptionResponseDTO} from "@status/adapters/dtos/UpdateDescriptionDTO";
import {Result} from "@coreShared/types/Result";
import {Messages} from "@coreShared/messages/messages";
import {UseCaseError} from "@coreShared/errors/UseCaseError";

export class UpdateDescriptionUseCaseMock {
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
            message:  Messages.Status.Success.UPDATED_TO(oldDescription, newDescription),
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