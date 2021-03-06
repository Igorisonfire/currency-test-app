import React, {useEffect} from 'react';
import './App.scss';
import {Dashboard} from './features/Dashboard'
import {useDispatch, useSelector} from 'react-redux'
import {selectCurrencyState} from './reducers/currency/slice'
import {getStartData} from './reducers/currency/thunk'
import {PreloaderMain} from './components/preloader-main'
import {ErrorMessage} from './components/error-message'

function App() {
    const dispatch = useDispatch()
    const currencyState = useSelector(selectCurrencyState);
    const isFetching = currencyState.isFetching

    useEffect(() => {
        dispatch(getStartData())
    }, [])

    if (isFetching) return <PreloaderMain/>

    return (
        <div className="App">
            <ErrorMessage/>
            <Dashboard/>
        </div>
    );
}

export default App;
