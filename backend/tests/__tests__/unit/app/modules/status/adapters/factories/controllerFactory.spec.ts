import { container } from "@coreConfig/container";
import {makeStatusController} from "@status/adapters/factories/controllerFactory";
import {StatusController} from "@status/adapters/controllers/statusController";

jest.mock("@coreConfig/container", () => ({
    container: {
        resolve: jest.fn(),
    },
}));

describe("makeStatusController", () => {
    it("must resolve the StatusController instance", () => {
        const mockController = {} as StatusController;
        (container.resolve as jest.Mock).mockReturnValue(mockController);

        const controller = makeStatusController();

        expect(container.resolve).toHaveBeenCalledWith("IStatusController");
        expect(controller).toBe(mockController);
    });
});