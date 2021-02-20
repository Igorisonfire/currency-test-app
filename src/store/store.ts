import { configureStore, ThunkAction, Action } from '@reduxjs/toolkit';
import currencyReducer from '../reducers/currency/slice';
import messagesReducer from '../reducers/messages/slice';

export const store = configureStore({
  reducer: {
    currency: currencyReducer,
    messages: messagesReducer
  },
});

export type RootState = ReturnType<typeof store.getState>;
export type AppThunk<ReturnType = void> = ThunkAction<
  ReturnType,
  RootState,
  unknown,
  Action<string>
>;
