import { Sequelize } from "sequelize-typescript";
import { UserTypeModel } from "@userType/infrastructure/model/UserTypeModel";
import { StatusModel } from "@status/infrastructure/models/StatusModel";

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

describe("UserTypeModel", () => {
    let sequelize: Sequelize;

    beforeAll(async () => {
        sequelize = new Sequelize({
            dialect: "sqlite",
            storage: ":memory:",
            logging: false,
        });

        sequelize.addModels([UserTypeModel, StatusModel]);
        await sequelize.sync();
    });

    afterAll(async () => {
        await sequelize.close();
    });

    it("should correctly define the columns and properties of the model", async () => {
        const attributes = UserTypeModel.getAttributes();

        expect(attributes.id).toBeDefined();
        expect(attributes.description).toBeDefined();
        expect(attributes.statusId).toBeDefined();
        expect(attributes.createdAt).toBeDefined();
        expect(attributes.updatedAt).toBeDefined();
    });

    it("should create a valid instance of UserTypeModel", async () => {
        const status = await StatusModel.create({ description: "ACTIVE" });
        const userType = await UserTypeModel.create({
            description: "Admin",
            statusId: status.id,
        });

        expect(userType).toBeDefined();
        expect(userType.id).toBeGreaterThan(0);
        expect(userType.description).toBe("Admin");
        expect(userType.statusId).toBe(status.id);
    });

    // it("should correctly associate the StatusModel model", async () => {
    //     const status = await StatusModel.create({ description: "ACTIVE" });
    //     const userType = await UserTypeModel.create({
    //         description: "Admin",
    //         statusId: status.id,
    //     });
    //
    //     const associatedStatus = await userType.$get("status");
    //
    //     expect(associatedStatus).toBeDefined();
    //     expect(associatedStatus?.description).toBe("ACTIVE");
    // });

    // it("should correctly apply the onDelete and onUpdate settings", async () => {
    //     const status = await StatusModel.create({ description: "ACTIVE" });
    //     const userType = await UserTypeModel.create({
    //         description: "Admin",
    //         statusId: status.id,
    //     });
    //
    //     await status.destroy();
    //     const updatedUserType = await UserTypeModel.findByPk(userType.id);
    //     expect(updatedUserType?.statusId).toBeNull();
    // });
});