import {transformCurrencyValue} from './transformCurrencyValue'

describe('transformCurrencyValue', () => {

    it('alue should be transformed to string with max 3 numbers after point"', () => {

        const result = transformCurrencyValue(0.123456)

        expect(result).toBe('0.123')
    })

    it('value should be transformed to string 0 -> ``', () => {

        const result = transformCurrencyValue(0)

        expect(result).toBe('')
    })
});




