import React from 'react';
import './index.scss';
import {useSelector} from 'react-redux'
import {selectCurrencyState} from '../../app/slices/currencySlice'
import {FormCard} from '../FormCard'
import {ChartCard} from '../ChartCard'

export function Dashboard() {
    const currencyState = useSelector(selectCurrencyState)
    const mainData = currencyState.data

    if (mainData.length) {
        return (
            <div className={'dashboard-wrapper global-container'}>
                <h1>Currency Dashboard</h1>
                <div className={'dashboard-grid'}>
                    <FormCard/>
                    <ChartCard/>
                </div>
            </div>
        );
    } else return (
        <div className={'wrong-view'}>
            <h1>Oops..!</h1>
            <br/>
            <h3>Something went wrong</h3>
        </div>
    )
}
