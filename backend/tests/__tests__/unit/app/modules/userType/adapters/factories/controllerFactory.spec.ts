import { container } from "@coreConfig/container";
import {UserTypeController} from "@userType/adapters/controller/userTypeController";
import {makeUserTypeController} from "@userType/adapters/factories/controllerFactory";

jest.mock("@coreConfig/container", () => ({
    container: {
        resolve: jest.fn(),
    },
}));

describe("makeUserTypeController", () => {
    it("must resolve the UserTypeController instance", () => {
        const mockController = {} as UserTypeController;
        (container.resolve as jest.Mock).mockReturnValue(mockController);

        const controller = makeUserTypeController();

        expect(container.resolve).toHaveBeenCalledWith("IUserTypeController");
        expect(controller).toBe(mockController);
    });
});