import React from 'react';
import './Chart.scss';
import {Button} from '../../components/button'
import {Input, useInput} from '../../components/input'
import IChart from '../../models/chart.model'
import {useDispatch, useSelector} from 'react-redux'
import {selectFetchingSend, setChartData} from './chartSlice'
import {DatePickerComponent, useDatePicker} from '../../components/datepicker'


export function ChartForm() {
    const dispatch = useDispatch()
    const fetchingSend = useSelector(selectFetchingSend)
    const minInput = useInput('')
    const avgInput = useInput('')
    const maxInput = useInput('')
    const date = useDatePicker(null)

    const onSendData = () => {
        const data: IChart.Segment = {
            min: Number(minInput.value),
            avg: Number(avgInput.value),
            max: Number(maxInput.value),
            x: date.selected ? date.selected.toISOString() : new Date().toISOString()
        }

        dispatch(setChartData(data))
        clearFields()
    }

    const clearFields = () => {
        minInput.clear()
        avgInput.clear()
        maxInput.clear()
        date.clear()
    }

    const buttonIsDisabled = !minInput.value || !avgInput.value || !maxInput.value || !date.selected

    return (
        <form className={'chart-form'}>
            <Input
                colour={'max'}
                name={'Max'}
                type={'number'}
                value={maxInput.value}
                onChange={maxInput.onChange}/>
            <Input
                colour={'avg'}
                name={'Avg'}
                type={'number'}
                value={avgInput.value}
                onChange={avgInput.onChange}/>
            <Input
                colour={'min'}
                name={'Min'}
                type={'number'}
                value={minInput.value}
                onChange={minInput.onChange}/>
            <DatePickerComponent
                name={'Date'}
                selected={date.selected}
                onChange={date.onChange}/>
            <Button
                name={'Send'}
                onClick={onSendData}
                disabled={buttonIsDisabled}
                loading={fetchingSend}/>
        </form>
    );
}
