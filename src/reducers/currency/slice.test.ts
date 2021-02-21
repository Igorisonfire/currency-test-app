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
import {CURRENCY_NAME, SELECT_POSITION} from '../../const/currency.const'
import {SEGMENT_DATA_TEST_1, SEGMENT_DATA_TEST_2} from '../../const/testsMock.const'

const initialState: ICurrencyState = {
    data: [SEGMENT_DATA_TEST_1],
    currentDate: dateToString(new Date()),
    currentQuotes: SEGMENT_DATA_TEST_1.quotes,
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
        const result = currencySlice.reducer(initialState, setDataSegment(SEGMENT_DATA_TEST_2))

        const expectResult: ICurrencyState = {
            ...initialState,
            data: [SEGMENT_DATA_TEST_2, SEGMENT_DATA_TEST_1],
        }

        expect(result).toStrictEqual(expectResult)
    })

    it('arrayData should be sorted and added to `data:`', () => {
        const result = currencySlice.reducer(initialState, setDataArray([SEGMENT_DATA_TEST_1, SEGMENT_DATA_TEST_2]))

        const expectResult: ICurrencyState = {
            ...initialState,
            data: [
                SEGMENT_DATA_TEST_2,
                SEGMENT_DATA_TEST_1,
            ],
            currentDate: SEGMENT_DATA_TEST_2.date,
            currentQuotes: SEGMENT_DATA_TEST_2.quotes
        }

        expect(result).toStrictEqual(expectResult)
    })

    it('currentQuotes and currentDate should be added to state', () => {

        const teestQuotes = {quotes: SEGMENT_DATA_TEST_1.quotes, date: SEGMENT_DATA_TEST_1.date}

        const result = currencySlice.reducer(initialState, setCurrentQuotes(teestQuotes))

        const expectResult: ICurrencyState = {
            ...initialState,
            currentDate: SEGMENT_DATA_TEST_1.date,
            currentQuotes: SEGMENT_DATA_TEST_1.quotes
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




