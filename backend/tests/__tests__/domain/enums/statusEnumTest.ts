import {StateEnum} from "../../../../src/core/shared/enums/StateEnum";

describe("StatusEnum", () => {
    it("should have the correct values", () => {
        expect(StateEnum.INACTIVE).toBe(0);
        expect(StateEnum.ACTIVE).toBe(1);
    });

    it("should correctly map names to values", () => {
        const statusKeys = Object.keys(StateEnum).filter(key => isNaN(Number(key)));
        const statusValues = Object.values(StateEnum)
            .filter(value => typeof value === "number");

        expect(statusKeys).toEqual(["INACTIVE", "ACTIVE"]);
        expect(statusValues).toEqual([0, 1]);
    });
});
