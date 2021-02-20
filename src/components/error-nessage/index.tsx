import * as React from 'react';
import "./index.scss";
import {selectMessagesState, setErrorMessage} from '../../app/slices/messagesSlice'
import {useDispatch, useSelector} from 'react-redux'

interface IProps {
}

export const ErrorMessage = (props: IProps) => {
    const dispatch = useDispatch()
    const messagesState = useSelector(selectMessagesState);
    const errorMessage = messagesState.errorMessage

    const onClose = () => {
        dispatch(setErrorMessage(''))
    }

    if (errorMessage.length) {
        return (
            <div className={'error-message'}>
                <p>{errorMessage}</p>
                <div className={'close'} onClick={onClose}>x</div>
            </div>
        )
    } else return null
}