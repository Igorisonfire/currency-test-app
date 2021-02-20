import {createSlice, PayloadAction} from '@reduxjs/toolkit';
import {RootState} from '../../store/store';

export interface IMessagesState {
    errorMessage: string
}

const initialState: IMessagesState = {
    errorMessage: ''
};

export const messagesSlice = createSlice({
    name: 'messages',
    initialState,
    reducers: {
        setErrorMessage: (state: IMessagesState, action: PayloadAction<string>) => {
            const errorMessage = action.payload

            return {
                ...state,
                errorMessage
            }
        }
    },
});

export const {
    setErrorMessage
} = messagesSlice.actions;


// The function below is called a selector and allows us to select a value from
// the state. Selectors can also be defined inline where they're used instead of
// in the slice file. For example: `useSelector((state: RootState) => state.counter.value)`
export const selectMessagesState = (state: RootState) => state.messages;

export default messagesSlice.reducer;
