import {StringUtil} from '@coreShared/utils/string.util';

export class CityTransformer {
    static normalizeDescription(description: string): string {
        return StringUtil.transformCapitalLetterWithoutAccent(description);
    }
}
