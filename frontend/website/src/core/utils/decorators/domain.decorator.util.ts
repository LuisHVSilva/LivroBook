import "reflect-metadata";

export class DomainDecoratorUtil {
    static readonly labelMetadataKey: string = 'labels';

    static getLabels(target: object): Record<string, string> {
        return (
            Reflect.getMetadata(DomainDecoratorUtil.labelMetadataKey, target) ??
            Reflect.getMetadata(DomainDecoratorUtil.labelMetadataKey, target.constructor?.prototype) ??
            {}
        );
    }
}