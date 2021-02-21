import {getStartData} from './thunk'
import {SEGMENT_DATA_TEST_1} from '../../const/testsMock.const'
import {CurrencyAPI} from '../../api/currency.api'
import {ICurrencyState, setIsFetching} from './slice'
import {dateToString} from '../../helpers/dateToString'
import {CURRENCY_NAME} from '../../const/currency.const'
import {RootState} from '../../store/store'

jest.mock('../../api/currency.api')

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

const mockState: RootState = {
    currency: initialState,
    messages: {errorMessage: ''}
}

const CurrencyAPIMock = CurrencyAPI as jest.Mocked<typeof CurrencyAPI>
const dispatchMock = jest.fn()
const getStateMock = () => mockState

beforeEach(() => {
    dispatchMock.mockClear()
    CurrencyAPIMock.getCurrencyData.mockClear()
})

describe('Currency Thunks', () => {

    it('getStartData', async () => {
        const thunk = getStartData()

        await thunk(dispatchMock, getStateMock, {})

        expect(dispatchMock).toHaveBeenNthCalledWith(1, setIsFetching(true))
    })
});




