import { createSlice, PayloadAction } from '@reduxjs/toolkit';
import { AppThunk, RootState } from '../store';
import ICurrency from '../../models/currency.model'
import {CurrencyAPI} from '../../api/currency.api'
import {dateToString} from '../../helpers/dateToString'
import {sortDataByDate} from '../../helpers/sortDataByDate'

export interface ICurrencyState {
  data: ICurrency.ModelLocal[];
}

const initialState: ICurrencyState = {
  data: [],
};

export const currencySlice = createSlice({
  name: 'currency',
  initialState,
  reducers: {
    setDataSegment: (state: ICurrencyState, action: PayloadAction<ICurrency.ModelApi>) => {
      const newQuotes: ICurrency.NewQuotes = {
        USDEUR: action.payload.quotes.USDEUR,
        USDCHF: action.payload.quotes.USDCHF,
        EURCHF: +(action.payload.quotes.USDCHF / action.payload.quotes.USDEUR).toFixed(6)
      }

      const newDataSegment: ICurrency.ModelLocal = {
        date: action.payload.date,
        quotes: newQuotes,
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

      return {
        ...state,
        data
      }
    }
  },
});

export const { setDataSegment, setDataArray } = currencySlice.actions;

// The function below is called a thunk and allows us to perform async logic. It
// can be dispatched like a regular action: `dispatch(incrementAsync(10))`. This
// will call the thunk with the `dispatch` function as the first argument. Async
// code can then be executed and other actions can be dispatched
export const getDataMain = (): AppThunk => async (dispatch, getState) => {

  const localCurrencyData = localStorage.getItem('localCurrencyData')
  const localCurrencyDataArray = localCurrencyData ? JSON.parse(localCurrencyData) : []

  dispatch(setDataArray(localCurrencyDataArray))
  const stateData = getState().currency.data

  for (let i = 0; i < 14; i++) {
    let date = new Date();
    date.setDate(date.getDate() - i);

    if(!stateData.length || stateData[0].date !== dateToString(date)) {
      try {
        const response = await CurrencyAPI.getCurrencyData(date)
        await dispatch(setDataSegment(response))
      } catch (error) {
        console.log(error)
      }
    } else if (stateData[0].date === dateToString(date)){
      break
    }
  }

  localStorage.setItem("localCurrencyData", JSON.stringify(getState().currency.data));
}

export const getCurrencyData = (date: Date): AppThunk => async dispatch => {
  try {
    const response = await CurrencyAPI.getCurrencyData(date)
    await dispatch(setDataSegment(response))
  } catch (error) {
    console.log(error)
  }
}


// The function below is called a selector and allows us to select a value from
// the state. Selectors can also be defined inline where they're used instead of
// in the slice file. For example: `useSelector((state: RootState) => state.counter.value)`
export const selectCurrencyState = (state: RootState) => state.currency;

export default currencySlice.reducer;
