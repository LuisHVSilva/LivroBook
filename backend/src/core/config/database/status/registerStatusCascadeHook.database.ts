import { Model, ModelStatic } from "sequelize";
import {addStatusCascadeHookDatabase} from "@coreConfig/database/status/addStatusCascadeHook.database";

export function registerStatusCascadeHookDatabase(
    cascadeMap: Map<ModelStatic<Model<any, any>>, { model: ModelStatic<Model<any, any>>; foreignKey: string }[]>
) {
    for (const [BaseModel, dependencies] of cascadeMap.entries()) {
        addStatusCascadeHookDatabase(BaseModel, dependencies);
    }
}
