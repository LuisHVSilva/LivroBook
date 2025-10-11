import {DeleteRequestDTO, DeleteResponseDTO, FindByIdRequestDTO} from "@coreShared/dtos/operation.dto";
import {UpdateResultType} from "@coreShared/types/crudResult.type";
import {ResultType} from "@coreShared/types/result.type";
import {Transaction} from "sequelize";

export type AbstractControllerBaseType<TEntity, TCreateReq, TCreateRes, TFindByIdRes, TFindAllReq, TFindAllRes, TUpdateReq, TUpdateRes> = {
    TEntity: TEntity,
    TCreateReq: TCreateReq,
    TCreateRes: TCreateRes,
    TFindByIdReq: FindByIdRequestDTO,
    TFindByIdRes: TFindByIdRes,
    TFindAllReq: TFindAllReq,
    TFindAllRes: TFindAllRes,
    TUpdateReq: TUpdateReq,
    TUpdateRes: UpdateResultType<TUpdateRes>,
    TDeleteReq: DeleteRequestDTO,
    TDeleteRes: DeleteResponseDTO
}

export type RelationMapType = {
    [fieldName: string]: {
        idField: string;
        filterField: string | string[];
        repo: { findOneByFilter: (filter: Record<string, any>, exact?: boolean, includes?: boolean, transaction?: Transaction) => Promise<ResultType<any>>; };
    };
};