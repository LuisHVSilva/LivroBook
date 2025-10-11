import {StringUtil} from '@coreShared/utils/string.util';

export class StateTransformer {
    static normalizeDescription(description: string): string {
        return StringUtil.transformCapitalLetterWithoutAccent(description);
    }
}
