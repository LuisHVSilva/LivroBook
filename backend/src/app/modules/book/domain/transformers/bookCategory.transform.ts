import { StringUtil } from '@coreShared/utils/string.util';

export class BookCategoryTransform {
    static normalizeDescription(description: string): string {
        return StringUtil.transformCapitalLetterWithoutAccent(description);
    }
}
