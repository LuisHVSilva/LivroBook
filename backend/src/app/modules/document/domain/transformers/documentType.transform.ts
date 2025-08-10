import { StringUtil } from '@coreShared/utils/string.util';

export class DocumentTypeTransform {
    static normalizeDescription(description: string): string {
        return StringUtil.transformCapitalLetterWithoutAccent(description);
    }
}
