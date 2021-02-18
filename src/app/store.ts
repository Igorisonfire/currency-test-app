import { configureStore, ThunkAction, Action } from '@reduxjs/toolkit';
import chartReducer from '../features/chart/chartSlice';
import currencyReducer from '../app/slices/currencySlice';

export const store = configureStore({
  reducer: {
    chart: chartReducer,
    currency: currencyReducer
  },
});

export type RootState = ReturnType<typeof store.getState>;
export type AppThunk<ReturnType = void> = ThunkAction<
  ReturnType,
  RootState,
  unknown,
  Action<string>
>;
