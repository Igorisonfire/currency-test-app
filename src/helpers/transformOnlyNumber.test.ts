import {transformOnlyNumber} from './transformOnlyNumber'

describe('transformOnlyNumber', () => {
    it('should be string without letters', () => {

        const result = transformOnlyNumber('34a')

        expect(result).toBe('34')
    })
});





