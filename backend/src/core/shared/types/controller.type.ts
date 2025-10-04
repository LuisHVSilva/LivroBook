import {DeleteRequestDTO, DeleteResponseDTO, FindByIdRequestDTO} from "@coreShared/dtos/operation.dto";
import {UpdateResultType} from "@coreShared/types/crudResult.type";

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