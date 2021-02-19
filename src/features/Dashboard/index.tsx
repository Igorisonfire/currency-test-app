import React, {useEffect} from 'react';
import './index.scss';
import {useDispatch, useSelector} from 'react-redux'
import {getStartData, selectCurrencyState} from '../../app/slices/currencySlice'
import {FormCard} from '../FormCard'
import {ChartCard} from '../ChartCard'

export function Dashboard() {
    const currencyState = useSelector(selectCurrencyState);
    const dispatch = useDispatch()

    useEffect(() => {
        dispatch(getStartData())
    }, [])

    console.log('currencyState', currencyState)

    return (
        <div className={'dashboard-wrapper global-container'}>
            <h1>Dashboard</h1>
            <div className={'dashboard-grid'}>
                {currencyState && currencyState.data.length && <FormCard/>}
                <ChartCard grid-area={'chart'}/>
            </div>
            {/*<Button name={'Get Data'} onClick={() => dispatch(getDataMain())}/>*/}
        </div>
    );
}
