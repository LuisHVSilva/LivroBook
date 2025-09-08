import { StringUtil } from '@coreShared/utils/string.util';

export class UserTypeTransform {
    static normalizeDescription(description: string): string {
        return StringUtil.transformCapitalLetterWithoutAccent(description);
    }
}
