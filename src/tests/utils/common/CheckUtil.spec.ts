import { CheckUtil } from '../../../utils/common/check.util';

describe('CommonUtil.ts', () => {
    it('isString()', () => {
        const result = CheckUtil.isString('abc');

        expect(result).toBe(true);
    });
});
