import { StringUtil } from '@coreShared/utils/string.util';

export class UserCredentialTypeTransform {
    static normalizeDescription(description: string): string {
        return StringUtil.transformCapitalLetterWithoutAccent(description);
    }
}
