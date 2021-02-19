import { createSlice, PayloadAction } from '@reduxjs/toolkit';
import { AppThunk, RootState } from '../store';
import ICurrency from '../../models/currency.model'
import {CurrencyAPI} from '../../api/currency.api'
import {dateToString} from '../../helpers/dateToString'
import {sortDataByDate} from '../../helpers/sortDataByDate'
import {CURRENCY_NAME} from '../../const/currency.const'
import {transformCurrencyValue} from '../../helpers/transformCurrencyValue'
import {sortDataToChart} from '../../helpers/sortDataToChart'

export interface ICurrencyState {
  data: ICurrency.ModelLocal[];
  currentDate: string
  currentQuotes: ICurrency.Quotes | null
  convertedValues: ICurrency.ConvertedValues | null,
  chartData: ICurrency.ChartDataSegment[]
}

const initialState: ICurrencyState = {
  data: [],
  currentDate: dateToString(new Date()),
  currentQuotes: null,
  convertedValues: null,
  chartData: []
};

export const currencySlice = createSlice({
  name: 'currency',
  initialState,
  reducers: {
    setDataSegment: (state: ICurrencyState, action: PayloadAction<ICurrency.ModelApi>) => {
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

      const EURCHF = +(quotes.USDCHF / quotes.USDEUR).toFixed(6)

      switch (currencyName) {
        case CURRENCY_NAME.USD: {
          convertedValues = {
            usdValue: value,
            eurValue: transformCurrencyValue(+value * quotes.USDEUR),
            chfValue: transformCurrencyValue(+value * quotes.USDCHF)
          }
          break
        }
        case CURRENCY_NAME.EUR: {
          convertedValues = {
            usdValue: transformCurrencyValue(+value / quotes.USDEUR),
            eurValue: value,
            chfValue: transformCurrencyValue(+value * EURCHF)
          }
          break
        }
        case CURRENCY_NAME.CHF: {
          convertedValues = {
            usdValue: transformCurrencyValue(+value / quotes.USDCHF),
            eurValue: transformCurrencyValue(+value / EURCHF),
            chfValue: value
          }
          break
        }
        default: break
      }

      return {
        ...state,
        convertedValues
      }
    },
    setChartData: (state: ICurrencyState, action: PayloadAction<string>) => {
      const ratesName = action.payload
      const chartData = sortDataToChart(state.data, ratesName)

      return {
        ...state,
        chartData
      }
    },
  },
});

export const {
  setDataSegment,
  setDataArray,
  setCurrentQuotes,
  setConvertValues,
  setChartData
} = currencySlice.actions;

// The function below is called a thunk and allows us to perform async logic. It
// can be dispatched like a regular action: `dispatch(incrementAsync(10))`. This
// will call the thunk with the `dispatch` function as the first argument. Async
// code can then be executed and other actions can be dispatched
export const getStartData = (): AppThunk => async (dispatch, getState) => {

  //get and set data from localstorage (if we have it there)
  const localCurrencyData = localStorage.getItem('localCurrencyData')
  const localCurrencyDataArray = localCurrencyData ? JSON.parse(localCurrencyData) : []
  localCurrencyDataArray.length && dispatch(setDataArray(localCurrencyDataArray))


  //get data for las 14 days (other than those available in the localstorage)
  for (let i = 0; i < 14; i++) {
    let date = new Date();
    date.setDate(date.getDate() - i);

    const stateData = getState().currency.data

    if(!stateData.length || !stateData[i] || stateData[i].date !== dateToString(date)) {
      try {
        const response = await CurrencyAPI.getCurrencyData(date)
        dispatch(setDataSegment(response))
      } catch (error) {
        console.log(error)
      }
    }
  }

  //start initialization
  dispatch(setCurrentQuotes({quotes: getState().currency.data[0].quotes, date: getState().currency.data[0].date}))
  dispatch(setConvertValues({value: '1', currencyName: CURRENCY_NAME.USD}))
  dispatch(setChartData('EURUSD'))

  //set updated data to localstorage
  localStorage.setItem("localCurrencyData", JSON.stringify(getState().currency.data));
}

export const getCurrentData = (date: Date): AppThunk => async (dispatch, getState) => {

  const stateData = getState().currency.data

  //check and set data for selected day from localstorage (if we have it there)
  for (let i = 0; i < stateData.length; i++) {
    if (stateData[i].date === dateToString(date)){
      dispatch(setCurrentQuotes({quotes: stateData[i].quotes, date: dateToString(date)}))
      dispatch(setConvertValues({value: '1', currencyName: CURRENCY_NAME.USD}))
      return
    }
  }

  //get data for selected day and set it to localstorage
  try {
    const response = await CurrencyAPI.getCurrencyData(date)
    dispatch(setDataSegment(response))
    dispatch(setCurrentQuotes({quotes: response.quotes, date: dateToString(date)}))
    dispatch(setConvertValues({value: '1', currencyName: CURRENCY_NAME.USD}))
    localStorage.setItem("localCurrencyData", JSON.stringify(getState().currency.data));
  } catch (error) {
    console.log(error)
  }
}


// The function below is called a selector and allows us to select a value from
// the state. Selectors can also be defined inline where they're used instead of
// in the slice file. For example: `useSelector((state: RootState) => state.counter.value)`
export const selectCurrencyState = (state: RootState) => state.currency;

export default currencySlice.reducer;
