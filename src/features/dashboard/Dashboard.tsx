import React from 'react';
import './Dashboard.scss';
import {Button} from '../../components/button'
import {useDispatch, useSelector} from 'react-redux'
import {getDataMain, selectCurrencyState} from '../../app/slices/currencySlice'

export function Dashboard() {
    const currencyState = useSelector(selectCurrencyState);
    const dispatch = useDispatch()

    console.log('currencyState', currencyState)

    return (
        <div className={'dashboard-wrapper'}>
            <h1>Dashboard</h1>
            <Button name={'Get Data'} onClick={() => dispatch(getDataMain())}/>
        </div>
    );
}
