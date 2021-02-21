import {convertCurrencyValues} from './convertCurrencyValues'
import ICurrency from '../models/currency.model'
import {CURRENCY_NAME} from '../const/currency.const'

const quotesTest: ICurrency.Quotes = {USDEUR: 0.825202, USDUSD: 1, USDCHF: 0.896245}

describe('convertCurrencyValues', () => {

    it('USD convert', () => {
        const result = convertCurrencyValues(quotesTest, '2', CURRENCY_NAME.USD)

        const expectedResult: ICurrency.ConvertedValues = {
            usdValue: '2',
            eurValue: '1.650',
            chfValue: '1.792'
        }

        expect(result).toStrictEqual(expectedResult)
    })

    it('EUR convert', () => {
        const result = convertCurrencyValues(quotesTest, '2', CURRENCY_NAME.EUR)

        const expectedResult: ICurrency.ConvertedValues = {
            usdValue: '2.424',
            eurValue: '2',
            chfValue: '2.172'
        }

        expect(result).toStrictEqual(expectedResult)
    })

    it('CHF convert', () => {
        const result = convertCurrencyValues(quotesTest, '2', CURRENCY_NAME.CHF)

        const expectedResult: ICurrency.ConvertedValues = {
            usdValue: '2.232',
            eurValue: '1.841',
            chfValue: '2'
        }

        expect(result).toStrictEqual(expectedResult)
    })

    it('should returned null', () => {
        const result = convertCurrencyValues(quotesTest, '2', 'INCORRECT NAME')

        expect(result).toBe(null)
    })
});



