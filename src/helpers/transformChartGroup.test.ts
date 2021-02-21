import ICurrency from '../models/currency.model'
import {CURRENCY_NAME, SELECT_POSITION} from '../const/currency.const'
import {transformChartGroup} from './transformChartGroup'

const optionUSD = {
    value: CURRENCY_NAME.USD,
    label: CURRENCY_NAME.USD
}

const optionEUR = {
    value: CURRENCY_NAME.EUR,
    label: CURRENCY_NAME.EUR
}

const optionCHF = {
    value: CURRENCY_NAME.CHF,
    label: CURRENCY_NAME.CHF
}

const initialSelectedGroupTest: ICurrency.SelectedChartGroup = {
    first: optionUSD,
    second: optionEUR
}

describe('transformChartGroup', () => {

    it('selected group should be changed from USD - EUR to EUR - USD', () => {

        const result = transformChartGroup(initialSelectedGroupTest, optionEUR, SELECT_POSITION.FIRST)

        const expectedResult: ICurrency.SelectedChartGroup = {
            first: optionEUR,
            second: optionUSD
        }

        expect(result).toStrictEqual(expectedResult)
    })

    it('selected group should be changed from USD - EUR to USD - CHF', () => {

        const result = transformChartGroup(initialSelectedGroupTest, optionCHF, SELECT_POSITION.SECOND)

        const expectedResult: ICurrency.SelectedChartGroup = {
            first: optionUSD,
            second: optionCHF
        }

        expect(result).toStrictEqual(expectedResult)
    })

    it('selected group should be changed from USD - EUR to CHF - EUR', () => {

        const result = transformChartGroup(initialSelectedGroupTest, optionCHF, SELECT_POSITION.FIRST)

        const expectedResult: ICurrency.SelectedChartGroup = {
            first: optionCHF,
            second: optionEUR
        }

        expect(result).toStrictEqual(expectedResult)
    })

    it('selected group should be changed from USD - EUR to EUR - USD', () => {

        const result = transformChartGroup(initialSelectedGroupTest, optionUSD, SELECT_POSITION.SECOND)

        const expectedResult: ICurrency.SelectedChartGroup = {
            first: optionEUR,
            second: optionUSD
        }

        expect(result).toStrictEqual(expectedResult)
    })

    it('data should not changed', () => {

        const result = transformChartGroup(initialSelectedGroupTest, optionEUR, 'INCORRECT NAME')

        expect(result).toStrictEqual(initialSelectedGroupTest)
    })
});




