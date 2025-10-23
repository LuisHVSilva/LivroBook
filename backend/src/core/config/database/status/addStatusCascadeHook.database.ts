import {Model, Transaction, ModelStatic} from "sequelize";
import {camelToSnakeLower} from "@coreShared/decorators/dbColumn";

interface CascadeDependency {
    model: ModelStatic<Model<any, any>>;
    foreignKey: string;
}

/**
 * Adiciona um hook genérico que propaga a mudança de statusId
 * para todos os models dependentes configurados.
 */
export function addStatusCascadeHookDatabase(
    BaseModel: ModelStatic<Model<any, any>>,
    dependencies: CascadeDependency[]
) {
    BaseModel.addHook("afterUpdate", async (instance: any, options: { transaction?: Transaction }) => {
        if (!instance.changed("statusId")) {
            return;
        }
        const newStatusId = instance.get("statusId");
        const parentId = instance.get("id");

        for (const {model, foreignKey} of dependencies) {
            const dbForeignKey = camelToSnakeLower(foreignKey);

            await model.update(
                {statusId: newStatusId},
                {
                    where: {[dbForeignKey]: parentId},
                    transaction: options.transaction,
                }
            );
        }

    });
}
