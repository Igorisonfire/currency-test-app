import {IMessagesState, messagesSlice, setErrorMessage} from './slice'

const initialState: IMessagesState = {
    errorMessage: ''
};

describe('Messages Slice', () => {

    it('errorMessage should be changed in `errorMessage:`', () => {

        const result = messagesSlice.reducer(initialState, setErrorMessage('Error'))

        expect(result.errorMessage).toBe('Error')
    })

});




