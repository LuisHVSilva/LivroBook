import { StringUtil } from '@coreShared/utils/string.util';

export class CountryTransformer {
    static normalizeDescription(description: string): string {
        return StringUtil.transformCapitalLetterWithoutAccent(description);
    }
}
