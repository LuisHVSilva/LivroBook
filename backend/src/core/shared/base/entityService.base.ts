// import {ResultType} from "@coreShared/types/result.type";
// import {NotFoundError} from "@coreShared/errors/domain.error";
// import {EntitiesMessage} from "@coreShared/messages/entities.message";
// import {unmanaged} from "inversify";
// import {IBaseRepository} from "@coreShared/interfaces/IBaseRepository";
// import {EntityType} from "@coreShared/types/entity.type";
//
// export abstract class BaseEntityService<T extends EntityType<any, any, any, any, any, any>> {
//     protected constructor(
//         @unmanaged()
//         protected readonly repo: IBaseRepository<T["Entity"], T["Model"], T["FilterDTO"]>,
//     ) {
//     }
//
//     async getById(id: number): Promise<T["Entity"]> {
//         const found: ResultType<T["Entity"]> = await this.repo.findById(id);
//         const entity: T["Entity"] | null = found.unwrapOrNull();
//
//         if (!entity) throw new NotFoundError(EntitiesMessage.error.retrieval.notFoundGeneric);
//
//         return entity;
//     }
// }