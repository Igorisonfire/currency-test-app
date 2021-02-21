import {
    currencySlice,
    ICurrencyState,
    setDataSegment,
    setDataArray,
    setCurrentQuotes,
    setConvertValues,
    updateChartData,
    setSelectedChartGroup,
    setIsFetching
} from './slice'
import {dateToString} from '../../helpers/dateToString'
import ICurrency from '../../models/currency.model'
import {CURRENCY_NAME, SELECT_POSITION} from '../../const/currency.const'

const segmentDataTest_1: ICurrency.ModelLocal = {
    date: "2021-01-01",
    quotes: {USDEUR: 0.821304, USDUSD: 1, USDCHF: 0.890075},
    timestamp: 1609545599
}

const segmentDataTest_2: ICurrency.ModelLocal = {
    date: "2021-01-02",
    quotes: {USDEUR: 0.824063, USDUSD: 1, USDCHF: 0.890075},
    timestamp: 1609631999
}

const initialState: ICurrencyState = {
    data: [segmentDataTest_1],
    currentDate: dateToString(new Date()),
    currentQuotes: segmentDataTest_1.quotes,
    convertedValues: null,
    chartData: [],
    selectedChartGroup: {
        first: {
            label: CURRENCY_NAME.USD,
            value: CURRENCY_NAME.USD
        },
        second: {
            label: CURRENCY_NAME.EUR,
            value: CURRENCY_NAME.EUR
        }
    },
    isFetching: false,
};

describe('Currency Slice', () => {

    it('dataSegment should be added to data array', () => {
        const result = currencySlice.reducer(initialState, setDataSegment(segmentDataTest_2))

        const expectResult: ICurrencyState = {
            ...initialState,
            data: [segmentDataTest_2, segmentDataTest_1],
        }

        expect(result).toStrictEqual(expectResult)
    })

    it('arrayData should be sorted and added to `data:`', () => {
        const result = currencySlice.reducer(initialState, setDataArray([segmentDataTest_1, segmentDataTest_2]))

        const expectResult: ICurrencyState = {
            ...initialState,
            data: [
                segmentDataTest_2,
                segmentDataTest_1,
            ],
            currentDate: segmentDataTest_2.date,
            currentQuotes: segmentDataTest_2.quotes
        }

        expect(result).toStrictEqual(expectResult)
    })

    it('currentQuotes and currentDate should be added to state', () => {

        const teestQuotes = {quotes: segmentDataTest_1.quotes, date: segmentDataTest_1.date}

        const result = currencySlice.reducer(initialState, setCurrentQuotes(teestQuotes))

        const expectResult: ICurrencyState = {
            ...initialState,
            currentDate: segmentDataTest_1.date,
            currentQuotes: segmentDataTest_1.quotes
        }

        expect(result).toStrictEqual(expectResult)
    })

    it('currency values should be calculated and added to state `convertedValues:`', () => {

        const result = currencySlice.reducer(initialState, setConvertValues({
            value: '1',
            currencyName: CURRENCY_NAME.USD
        }))

        const expectResult: ICurrencyState = {
            ...initialState,
            convertedValues: {
                usdValue: '1',
                eurValue: '0.821',
                chfValue: '0.890'
            }
        }

        expect(result).toStrictEqual(expectResult)
    })

    it('convertedValues should be return if quotes', () => {

        const newInitialState: ICurrencyState = {
            ...initialState,
            currentQuotes: null
        }

        const result = currencySlice.reducer(newInitialState, setConvertValues({
            value: '1',
            currencyName: CURRENCY_NAME.USD
        }))

        expect(result).toStrictEqual(newInitialState)
    })

    it('data for chart should be updated in state `chartData:`', () => {

        const result = currencySlice.reducer(initialState, updateChartData())

        const expectResult: ICurrencyState = {
            ...initialState,
            chartData: [
                {
                    date: 'Jan 01',
                    value: 0.821
                }
            ]
        }

        expect(result).toStrictEqual(expectResult)
    })

    it('selectedChartGroup should be changed in `selectedChartGroup:`', () => {

        const data = {
            option: {
                value: CURRENCY_NAME.EUR,
                label: CURRENCY_NAME.EUR
            },
            position: SELECT_POSITION.FIRST
        }

        const result = currencySlice.reducer(initialState, setSelectedChartGroup(data))

        const expectResult: ICurrencyState = {
            ...initialState,
            selectedChartGroup: {
                first: {
                    value: CURRENCY_NAME.EUR,
                    label: CURRENCY_NAME.EUR
                },
                second: {
                    value: CURRENCY_NAME.USD,
                    label: CURRENCY_NAME.USD
                }
            }
        }

        expect(result).toStrictEqual(expectResult)
    })

    it('isFetching should be changed in `isFetching:`', () => {

        const result = currencySlice.reducer(initialState, setIsFetching(true))

        const expectResult: ICurrencyState = {
            ...initialState,
            isFetching: true
        }

        expect(result).toStrictEqual(expectResult)
    })
});




