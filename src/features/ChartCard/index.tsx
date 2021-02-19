import React from 'react';
import './index.scss';
import {ISelectOption, SelectComponent} from '../../components/select'
import {CURRENCY_OPTIONS, SELECT_POSITION} from '../../const/currency.const'
import {useDispatch, useSelector} from 'react-redux'
import {selectCurrencyState, updateChartData, setSelectedChartGroup} from '../../app/slices/currencySlice'

export function ChartCard() {
    const dispatch = useDispatch()
    const currencyState = useSelector(selectCurrencyState);
    const selectedChartGroup = currencyState.selectedChartGroup

    const onChangeSelect = (value: ISelectOption, id: string) => {
        const selectedData = {option: value, position: id}
        dispatch(setSelectedChartGroup(selectedData))
        dispatch(updateChartData())
    }

    return (
        <div className={'chart-card'}>
            <h2>Chart</h2>
            {selectedChartGroup ?
                <>
                    <SelectComponent
                        options={CURRENCY_OPTIONS}
                        id={SELECT_POSITION.FIRST}
                        value={selectedChartGroup.first}
                        onChange={onChangeSelect}/>
                    <SelectComponent
                        options={CURRENCY_OPTIONS}
                        id={SELECT_POSITION.SECOND}
                        value={selectedChartGroup.second}
                        onChange={onChangeSelect}/>
                </> : null}
        </div>
    );
}
