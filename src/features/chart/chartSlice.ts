import { createSlice, PayloadAction } from '@reduxjs/toolkit';
import { AppThunk, RootState } from '../../app/store';
import IChart from '../../models/chart.model'
import {ChartAPI} from '../../api/chart.api'
import {sortChartData} from '../../helpers/sortChartData'

export interface IChartState {
  data: IChart.Segment[];
  lines: IChart.Lines | null
  fetchingSend: boolean
}

const initialState: IChartState = {
  data: [],
  lines: null,
  fetchingSend: false
};

export const chartSlice = createSlice({
  name: 'chart',
  initialState,
  reducers: {
    setData: (state: IChartState, action: PayloadAction<IChart.Segment[]>) => {
      const data = action.payload
      const lines = sortChartData(data)

      return {
        ...state,
        data,
        lines
      }
    },
    setNewSegment: (state: IChartState, action: PayloadAction<IChart.Segment>) => {
      const newData = [action.payload, ...state.data]
      const lines = sortChartData(newData)

      return{
        ...state,
        data: newData,
        lines
      }
    },
    setFetchingSend: (state: IChartState, action: PayloadAction<boolean>) => {
      return{
        ...state,
        fetchingSend: action.payload
      }
    }
  },
});

export const { setData, setNewSegment, setFetchingSend } = chartSlice.actions;

// The function below is called a thunk and allows us to perform async logic. It
// can be dispatched like a regular action: `dispatch(incrementAsync(10))`. This
// will call the thunk with the `dispatch` function as the first argument. Async
// code can then be executed and other actions can be dispatched
export const getChartData = (): AppThunk => async dispatch => {
  try {
    const response = await ChartAPI.getChartData()
    await dispatch(setData(response))
  } catch (error) {
    console.log(error)
  }
}

export const setChartData = (data: IChart.Segment): AppThunk => async dispatch => {
  try {
    await dispatch(setFetchingSend(true))
    await ChartAPI.setChartData(data)
    await dispatch(setNewSegment(data))
    await dispatch(setFetchingSend(false))
  } catch (error) {
    console.log(error)
    await dispatch(setFetchingSend(false))
  }
}

// The function below is called a selector and allows us to select a value from
// the state. Selectors can also be defined inline where they're used instead of
// in the slice file. For example: `useSelector((state: RootState) => state.counter.value)`
export const selectChartData = (state: RootState) => state.chart.data;
export const selectChartLines = (state: RootState) => state.chart.lines;
export const selectFetchingSend = (state: RootState) => state.chart.fetchingSend;

export default chartSlice.reducer;
