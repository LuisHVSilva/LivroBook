import {IMetadataService} from "@modules/metadata/domain/services/interfaces/IMetadata.service";
import {AbstractDataType, ModelAttributeColumnOptions} from "sequelize";
import {SimplifiedMetadataAttribute} from "@coreShared/types/metadata.type";
import {IRepositoryBase} from "@coreShared/base/interfaces/IRepositoryBase";
import {NotFoundError} from "@coreShared/errors/classes.error";
import {EntitiesList, EntitiesNamesEnum} from "@coreShared/enums/entitiesNamesEnum";
import {RepositoryFactory} from "@modules/metadata/adapters/factories/repositories.factory";
import {GetAllEntitiesNamesDTO} from "@modules/metadata/adapters/dtos/metadata.dto";

export class MetadataService implements IMetadataService {
    async getModelAttributes(modelName: EntitiesNamesEnum): Promise<SimplifiedMetadataAttribute[]> {
        const repo:IRepositoryBase<any> | null= RepositoryFactory.getRepository(modelName);
        if (!repo) {
            throw new NotFoundError("Entidade não encontrada");
        }
        const attributes = await repo.getMetadata();

        return Object.entries(attributes).map(([name, options]) => {
            const column = options as ModelAttributeColumnOptions;

            // const typeStr = (column.type as any).key ?? (column.type as AbstractDataType).toSql() ?? String(column.type);
            const typeStr: string = this.getColumnType(column);

            return {
                columnName: name,
                dataType: typeStr,
                allowNull: column.allowNull ?? true,
                maxLength: (column.validate as any)?.len?.[1],
                minLength: (column.validate as any)?.len?.[0],
            };
        });
    }

    public getAllEntitiesNames(): GetAllEntitiesNamesDTO {
        return EntitiesList;
    }

    private getColumnType(column: ModelAttributeColumnOptions): string {
        if ((column.type as any).key) return (column.type as any).key;
        if ((column.type as AbstractDataType).toSql) return (column.type as AbstractDataType).toSql();
        return String(column.type);
    }
}
