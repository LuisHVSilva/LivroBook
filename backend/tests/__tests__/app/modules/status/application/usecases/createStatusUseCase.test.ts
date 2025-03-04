import {
    CreateStatusUseCase,
    StatusCreationError
} from "../../../../../../../src/app/modules/status/application/usecases/createStatusUseCase";
import {Status} from "../../../../../../../src/app/modules/status/domain/status";
import {IStatusRepository} from "../../../../../../../src/app/modules/status/application/ports/IStatusRepository";
import {ILogger} from "../../../../../../../src/core/shared/logs/ILogger";
import {Messages} from "../../../../../../../src/core/shared/constants/messages";

// Mocks
const statusRepositoryMock: jest.Mocked<IStatusRepository> = {
    findById: jest.fn(),
    save: jest.fn(),
};

const loggerMock: jest.Mocked<ILogger> = {
    logError: jest.fn(),
    logWarn: jest.fn(),
    logInfo: jest.fn(),
    logSuccess: jest.fn(),
};

describe("CreateStatusUseCase", () => {
    let createStatusUseCase: CreateStatusUseCase;

    beforeEach(() => {
        jest.clearAllMocks();
        createStatusUseCase = new CreateStatusUseCase(statusRepositoryMock, loggerMock);
    });

    it("Deve criar um novo status com sucesso", async () => {
        // Arrange
        const input = { description: "Novo Status" };
        const mockStatus = Status.create(input.description);

        statusRepositoryMock.save.mockResolvedValue(mockStatus);

        // Act
        const result = await createStatusUseCase.execute(input);

        // Assert
        expect(statusRepositoryMock.save).toHaveBeenCalledWith(
            expect.objectContaining({
                description: input.description,
                active: mockStatus.getActive(), // Garante que o estado inicial está correto
            })
        );
        expect(result).toEqual({ description: input.description });
    });

    it("Deve lançar erro ao falhar na criação do status", async () => {
        // Arrange
        const input = {description: "Falha"};
        statusRepositoryMock.save.mockRejectedValue(new Error(Messages.Status.Error.CREATED_FAILED));

        // Act & Assert
        await expect(createStatusUseCase.execute(input)).rejects.toThrow(StatusCreationError);
        expect(loggerMock.logError).toHaveBeenCalled();
    });

    it("Deve lançar erro ao tentar criar um status com descrição inválida", async () => {
        // Arrange
        const input = {description: "No"}; // Menos de 3 caracteres

        // Act & Assert
        await expect(createStatusUseCase.execute(input)).rejects.toThrow(Error);
    });
});
