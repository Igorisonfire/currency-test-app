import ICurrency from '../models/currency.model'
import {sortDataToChart} from './sortDataToChart'
import {CURRENCY_NAME} from '../const/currency.const'
import {SEGMENT_DATA_TEST_1, SEGMENT_DATA_TEST_2} from '../const/testsMock.const'

describe('sortDataToChart', () => {

    it('data should be transformed and sorted for chart USD - EUR', () => {

        const result = sortDataToChart(
            [SEGMENT_DATA_TEST_1, SEGMENT_DATA_TEST_2],
            CURRENCY_NAME.USD + CURRENCY_NAME.EUR
        )

        const expectedResult: ICurrency.ChartDataSegment[] = [
            {value: 0.821, date: "Jan 01"},
            {value: 0.824, date: "Jan 02"}
        ]

        expect(result).toStrictEqual(expectedResult)
    })

    it('data should be transformed and sorted for chart USD - CHF', () => {

        const result = sortDataToChart(
            [SEGMENT_DATA_TEST_1, SEGMENT_DATA_TEST_2],
            CURRENCY_NAME.USD + CURRENCY_NAME.CHF
        )

        const expectedResult: ICurrency.ChartDataSegment[] = [
            {value: 0.89, date: "Jan 01"},
            {value: 0.89, date: "Jan 02"}
        ]

        expect(result).toStrictEqual(expectedResult)
    })

    it('data should be transformed and sorted for chart EUR - CHF', () => {

        const result = sortDataToChart(
            [SEGMENT_DATA_TEST_1, SEGMENT_DATA_TEST_2],
            CURRENCY_NAME.EUR + CURRENCY_NAME.CHF
        )

        const expectedResult: ICurrency.ChartDataSegment[] = [
            {value: 1.084, date: "Jan 01"},
            {value: 1.08, date: "Jan 02"}
        ]

        expect(result).toStrictEqual(expectedResult)
    })

    it('data should be transformed and sorted for chart EUR - USD', () => {

        const result = sortDataToChart(
            [SEGMENT_DATA_TEST_1, SEGMENT_DATA_TEST_2],
            CURRENCY_NAME.EUR + CURRENCY_NAME.USD
        )

        const expectedResult: ICurrency.ChartDataSegment[] = [
            {value: 1.218, date: "Jan 01"},
            {value: 1.213, date: "Jan 02"}
        ]

        expect(result).toStrictEqual(expectedResult)
    })

    it('data should be transformed and sorted for chart CHF - USD', () => {

        const result = sortDataToChart(
            [SEGMENT_DATA_TEST_1, SEGMENT_DATA_TEST_2],
            CURRENCY_NAME.CHF + CURRENCY_NAME.USD
        )

        const expectedResult: ICurrency.ChartDataSegment[] = [
            {value: 1.124, date: "Jan 01"},
            {value: 1.124, date: "Jan 02"}
        ]

        expect(result).toStrictEqual(expectedResult)
    })

    it('data should be transformed and sorted for chart CHF - EUR', () => {

        const result = sortDataToChart(
            [SEGMENT_DATA_TEST_1, SEGMENT_DATA_TEST_2],
            CURRENCY_NAME.CHF + CURRENCY_NAME.EUR
        )

        const expectedResult: ICurrency.ChartDataSegment[] = [
            {value: 0.923, date: "Jan 01"},
            {value: 0.926, date: "Jan 02"}
        ]

        expect(result).toStrictEqual(expectedResult)
    })

    it('data should be []', () => {

        const result = sortDataToChart(
            [SEGMENT_DATA_TEST_1, SEGMENT_DATA_TEST_2],
            'INCORRECT NAME'
        )

        expect(result).toStrictEqual([])
    })
});




