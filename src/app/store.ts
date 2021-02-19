import { configureStore, ThunkAction, Action } from '@reduxjs/toolkit';
import currencyReducer from '../app/slices/currencySlice';

export const store = configureStore({
  reducer: {
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
