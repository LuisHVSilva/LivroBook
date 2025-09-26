import {IRepositoryBase} from "@coreShared/base/interfaces/IRepositoryBase";
import {PublisherBaseRepositoryType} from "@modules/book/adapters/dtos/publisher.dto";

export interface IPublisherRepository extends IRepositoryBase<PublisherBaseRepositoryType> {
}