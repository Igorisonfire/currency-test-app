import React, {useEffect} from 'react';
import './Dashboard.scss';
import {useDispatch, useSelector} from 'react-redux'
import {getCurrentData, getStartData, selectCurrencyState} from '../../app/slices/currencySlice'
import {FormCard} from '../FormCard/FormCard'

export function Dashboard() {
    const currencyState = useSelector(selectCurrencyState);
    const dispatch = useDispatch()

    useEffect(() => {
        dispatch(getStartData())
    }, [])

    console.log('currencyState', currencyState)

    return (
        <div className={'dashboard-wrapper'}>
            <h1>Dashboard</h1>
            {currencyState && currencyState.data.length && <FormCard/>}
            {/*<Button name={'Get Data'} onClick={() => dispatch(getDataMain())}/>*/}
        </div>
    );
}
