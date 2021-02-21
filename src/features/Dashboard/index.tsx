import React from 'react';
import './index.scss';
import {useSelector} from 'react-redux'
import {selectCurrencyState} from '../../reducers/currency/slice'
import {ConverterCard} from '../ConverterCard'
import {ChartCard} from '../ChartCard'

export function Dashboard() {
    const currencyState = useSelector(selectCurrencyState)
    const mainData = currencyState.data

    console.log(currencyState)

    if (mainData.length) {
        return (
            <div className={'dashboard-wrapper global-container'}>
                <h1>Currency Dashboard</h1>
                <div className={'dashboard-grid'}>
                    <ConverterCard/>
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
