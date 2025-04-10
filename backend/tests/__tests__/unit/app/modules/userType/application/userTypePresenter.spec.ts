import {UserType} from "@userType/domain/userType";
import {UserTypePresenter} from "@userType/application/userTypePresenter";
import {UserTypeMessages} from "@coreShared/messages/userTypeMessages";

describe("UserTypePresenter", () => {
    describe("toCreateOutputDTO", () => {
        it("should map UserType to CreateUserTypeOutputDTO", () => {
            const userType = {
                id: {toString: () => "1"},
                description: "Admin",
                status: {
                    getDescription: () => "Active"
                }
            } as unknown as UserType;

            const result = UserTypePresenter.toCreateOutputDTO(userType);

            expect(result).toEqual({
                message: UserTypeMessages.Success.Creation(userType.description),
                id: "1",
                description: "Admin",
                status: "Active"
            });
        });
    });
})