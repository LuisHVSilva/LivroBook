import * as z from "zod";
import {pt} from "zod/locales"
import {EntitiesMessage} from "@coreShared/messages/entities.message";

z.config(pt());

z.config({
    customError: (iss) => {
        if (!iss.path) {
            return {message: EntitiesMessage.error.validation.nullBodyRequest}
        }

        const field: string = iss.path.join(".")
        console.log(iss.code)
        switch (iss.code) {
            case "too_small":
                return {message: EntitiesMessage.error.validation.invalidMinLen(field, iss.minimum.toString())};
            case "too_big":
                return {message: EntitiesMessage.error.validation.invalidMaxLen(field, iss.maximum.toString())};
            case "invalid_type":
                return {message: EntitiesMessage.error.validation.invalidType(field, iss.expected)};
            default:
                return {message: "Erro de validação nos campos enviados."};
        }
    },
});

