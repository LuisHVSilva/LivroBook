import {Transaction} from "sequelize";
import {FindAllType} from "@coreShared/types/findAll.type";
import {UpdateResultType} from "@coreShared/types/crudResult.type";
import {DeleteStatusEnum} from "@coreShared/enums/deleteStatus.enum";
import {DeleteReport} from "@coreShared/utils/operationReport.util";
import {DtoBaseType} from "@coreShared/types/entity.type";
import {SimplifiedMetadataAttribute} from "@coreShared/types/metadata.type";

export interface IServiceBase<T extends DtoBaseType<any, any, any, any, any>, TEntity> {
    create(data: T["CreateDTO"], transaction: Transaction): Promise<TEntity>;

    getById(id: number): Promise<TEntity>;

    getMetadata(): Promise<SimplifiedMetadataAttribute[]>;

    findMany(filter: T["FilterDTO"], page?: number, limit?: number): Promise<FindAllType<TEntity>>;

    update(newData: T["UpdateDTO"], transaction: Transaction): Promise<UpdateResultType<TEntity>>;

    delete(id: number, transaction: Transaction): Promise<DeleteStatusEnum>;

    deleteMany(ids: number[], transaction: Transaction): Promise<DeleteReport>;
}