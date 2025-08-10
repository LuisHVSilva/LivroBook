import { StringUtil } from '@coreShared/utils/string.util';

export class PhoneTypeTransformer {
    static normalizeDescription(description: string): string {
        return StringUtil.transformCapitalLetterWithoutAccent(description);
    }
}
