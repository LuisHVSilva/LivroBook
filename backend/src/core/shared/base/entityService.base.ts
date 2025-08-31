// import {EntityType} from "@coreShared/types/entity.type";
// import {unmanaged} from "inversify";
//
// export abstract class BaseEntityService<T extends EntityType<any, any, any, any, any, any>> {
//     protected constructor(
//         @unmanaged()
//         protected readonly repo: IRepositoryBase<T["Entity"], T["Model"], T["FilterDTO"]>,
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