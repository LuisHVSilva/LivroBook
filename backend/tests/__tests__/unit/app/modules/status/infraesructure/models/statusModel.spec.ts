import { StatusModel } from "@status/infrastructure/models/StatusModel";

jest.mock("@status/infrastructure/models/StatusModel");
jest.mock("@coreConfig/database", () => ({
    Database: {
        getInstance: jest.fn(() => ({
            addModels: jest.fn(),
            sync: jest.fn(),
            authenticate: jest.fn(),
            close: jest.fn(),
        })),
    },
}));

describe("Status Model - Unit Test", () => {
    test("Should create a valid status", async () => {
        const mockStatus = {
            id: 1,
            description: "Ativo",
            active: true,
            createdAt: new Date(),
            updatedAt: new Date(),
        };

        (StatusModel.create as jest.Mock).mockResolvedValue(mockStatus);

        const newStatus = await StatusModel.create({
            description: "Ativo",
            active: true,
        });

        expect(newStatus).toBeDefined();
        expect(newStatus.id).toBe(1);
        expect(newStatus.description).toBe("Ativo");
        expect(newStatus.active).toBe(true);
        expect(newStatus.createdAt).toBeInstanceOf(Date);
        expect(newStatus.updatedAt).toBeInstanceOf(Date);
    });
});
