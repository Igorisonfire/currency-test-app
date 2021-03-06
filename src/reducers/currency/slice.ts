import { createSlice, PayloadAction } from '@reduxjs/toolkit';
import { RootState } from '../../store/store';
import ICurrency from '../../models/currency.model'
import {dateToString} from '../../helpers/dateToString'
import {sortDataByDate} from '../../helpers/sortDataByDate'
import {sortDataToChart} from '../../helpers/sortDataToChart'
import {ISelectOption} from '../../components/select'
import {transformChartGroup} from '../../helpers/transformChartGroup'
import {convertCurrencyValues} from '../../helpers/convertCurrencyValues'

export interface ICurrencyState {
  data: ICurrency.ModelLocal[];
  currentDate: string
  currentQuotes: ICurrency.Quotes | null
  convertedValues: ICurrency.ConvertedValues | null,
  chartData: ICurrency.ChartDataSegment[]
  selectedChartGroup: ICurrency.SelectedChartGroup | null
  isFetching: boolean
}

const initialState: ICurrencyState = {
  data: [],
  currentDate: dateToString(new Date()),
  currentQuotes: null,
  convertedValues: null,
  chartData: [],
  selectedChartGroup: null,
  isFetching: false,
};

export const currencySlice = createSlice({
  name: 'currency',
  initialState,
  reducers: {
    setDataSegment: (state: ICurrencyState, action: PayloadAction<ICurrency.ModelApi | ICurrency.ModelLocal>) => {
      const newDataSegment: ICurrency.ModelLocal = {
        date: action.payload.date,
        quotes: action.payload.quotes,
        timestamp: action.payload.timestamp
      }

      const data = sortDataByDate([...state.data, newDataSegment])

      return {
        ...state,
        data,
      }
    },
    setDataArray: (state: ICurrencyState, action: PayloadAction<ICurrency.ModelLocal[]>) => {
      const data = sortDataByDate(action.payload)
      const currentDate = data[0].date
      const currentQuotes = data[0].quotes

      return {
        ...state,
        data,
        currentDate,
        currentQuotes
      }
    },
    setCurrentQuotes: (state: ICurrencyState, action: PayloadAction<{quotes: ICurrency.Quotes, date: string}>) => {
      const currentQuotes = action.payload.quotes
      const currentDate = action.payload.date

      return {
        ...state,
        currentDate,
        currentQuotes
      }
    },
    setConvertValues: (state: ICurrencyState, action: PayloadAction<{value: string, currencyName: string}>) => {
      const currencyName = action.payload.currencyName
      const value = action.payload.value
      const quotes = state.currentQuotes

      let convertedValues = null

      if (!quotes) return

      convertedValues = convertCurrencyValues(quotes, value, currencyName)

      return {
        ...state,
        convertedValues
      }
    },
    updateChartData: (state: ICurrencyState) => {
      const selectedChartGroup = state.selectedChartGroup
      const firstValue = selectedChartGroup && selectedChartGroup.first ? selectedChartGroup.first.value : ''
      const secondValue = selectedChartGroup && selectedChartGroup.second ? selectedChartGroup.second.value : ''
      const ratesName = firstValue + secondValue
      const chartData = sortDataToChart(state.data, ratesName)

      return {
        ...state,
        chartData
      }
    },
    setSelectedChartGroup: (state: ICurrencyState, action: PayloadAction<{option: ISelectOption, position: string}>) => {
      const option = action.payload.option
      const position = action.payload.position
      let selectedChartGroup = transformChartGroup(state.selectedChartGroup, option, position)

      return {
        ...state,
        selectedChartGroup
      }
    },
    setIsFetching: (state: ICurrencyState, action: PayloadAction<boolean>) => {
      const isFetching = action.payload

      return {
        ...state,
        isFetching
      }
    },
  },
});

export const {
  setDataSegment,
  setDataArray,
  setCurrentQuotes,
  setConvertValues,
  updateChartData,
  setSelectedChartGroup,
  setIsFetching
} = currencySlice.actions;




// The function below is called a selector and allows us to select a value from
// the state. Selectors can also be defined inline where they're used instead of
// in the slice file. For example: `useSelector((state: RootState) => state.counter.value)`
export const selectCurrencyState = (state: RootState) => state.currency;

export default currencySlice.reducer;
