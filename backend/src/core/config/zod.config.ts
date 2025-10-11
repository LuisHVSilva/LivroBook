import * as z from "zod";
import {pt} from "zod/locales"
import {EntitiesMessage} from "@coreShared/messages/entities.message";

z.config(pt());

z.config({
    customError: (iss) => {
        const field = getField(iss);

        switch (iss.code) {
            case "too_small":
                return { message: EntitiesMessage.zod.invalidMinLen(field, iss.minimum?.toString()) };
            case "too_big":
                return { message: EntitiesMessage.zod.invalidMaxLen(field, iss.maximum?.toString()) };
            case "invalid_type":
                if(field === 'body') {
                    return { message: EntitiesMessage.zod.nullBody };
                }
                return { message: EntitiesMessage.zod.invalidType(field, iss.expected) };
            case "unrecognized_keys":
                return { message: EntitiesMessage.zod.unrecognizedKey((iss.keys ?? []).join(", ")) };
            default:
                return { message: "Erro de validação nos campos enviados." };
        }
    },
});

function getField(iss: any): string {
    if (!iss.path || iss.path.length === 0) {
        return "body";
    }

    return iss.path.join(".");
}