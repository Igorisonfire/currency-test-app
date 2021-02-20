import React from 'react';
import './App.scss';
import {Dashboard} from './features/Dashboard'
import {useSelector} from 'react-redux'
import {selectCurrencyState} from './app/slices/currencySlice'
import {PreloaderMain} from './components/preloader-main'
import {ErrorMessage} from './components/error-message'

function App() {
    const currencyState = useSelector(selectCurrencyState);
    const isFetching = currencyState.isFetching

    return (
        <div className="App">
            <ErrorMessage/>
            {isFetching ? <PreloaderMain/> : <Dashboard/>}
        </div>
    );
}

export default App;
