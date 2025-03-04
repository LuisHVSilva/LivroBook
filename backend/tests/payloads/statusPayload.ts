import { StateEnum } from "../../src/core/shared/enums/StateEnum"

export const StatusPayload = {
    valid: {
        id: "123e4567-e89b-12d3-a456-426614174000",
        description: "Status válido",
        active: StateEnum.INACTIVE
    },
    invalid: {
        shortDescription: "Abc", // Menos de 3 caracteres
    }
};
