import React, {useEffect} from 'react';
import './index.scss';
import {useDispatch, useSelector} from 'react-redux'
import {getStartData, selectCurrencyState} from '../../app/slices/currencySlice'
import {FormCard} from '../FormCard'
import {ChartCard} from '../ChartCard'

export function Dashboard() {
    const currencyState = useSelector(selectCurrencyState)
    const mainData = currencyState.data
    const dispatch = useDispatch()

    useEffect(() => {
        dispatch(getStartData())
    }, [])

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
