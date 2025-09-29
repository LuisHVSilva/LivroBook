import {container} from "@coreConfig/container"
import {IMetadataController} from "@modules/metadata/adapters/controller/IMetadata.controller";

export const makeMetadataController = (): IMetadataController => {
    return container.resolve<IMetadataController>("IMetadataController");
};
