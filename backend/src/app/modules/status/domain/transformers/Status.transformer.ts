import { StringUtil } from '@coreShared/utils/string.util';

export class StatusTransformer {
    static normalizeDescription(description: string): string {
        return StringUtil.transformCapitalLetterWithoutAccent(description);
    }
}
