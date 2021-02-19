import React from 'react';
import './FormCard.scss';
import {useDispatch, useSelector} from 'react-redux'
import {getCurrentData, selectCurrencyState, setConvertValues} from '../../app/slices/currencySlice'
import {Input} from '../../components/input'
import {DatePickerComponent} from '../../components/datepicker'
import {CURRENCY_NAME} from '../../const/currency.const'
import EUImage from '../../img/european-union.svg'
import USImage from '../../img/united-states.svg'
import SwitzerlandImage from '../../img/switzerland.svg'
import CalendarImage from '../../img/calendar.svg'
import {transformOnlyNumber} from '../../helpers/transformOnlyNumber'

export function FormCard() {
    const dispatch = useDispatch()
    const currencyState = useSelector(selectCurrencyState);
    const convertedValues = currencyState.convertedValues
    const currentDate = currencyState.currentDate

    const onChangeInput = (event: React.ChangeEvent<HTMLInputElement>) => {
        const inputData = {value: transformOnlyNumber(event.target.value), currencyName: event.target.id}
        dispatch(setConvertValues(inputData))
    }

    const onChangeDate = (date: Date) => {
        dispatch(getCurrentData(date))
    }

    return (
        <form className={'form-card'}>
            <h2>Converter</h2>
            <div className={'input-plus-image'}>
                <DatePickerComponent
                    name={'Date'}
                    selected={new Date(currentDate)}
                    onChange={onChangeDate}/>
                <img src={CalendarImage} alt='calendar'/>
            </div>

            {convertedValues && <>
                <div className={'input-plus-image'}>
                    <Input
                        id={CURRENCY_NAME.USD}
                        name={CURRENCY_NAME.USD}
                        type={'number'}
                        value={convertedValues.usdValue}
                        onChange={onChangeInput}/>
                    <img src={USImage} alt='US'/>
                </div>
                <div className={'input-plus-image'}>
                    <Input
                        id={CURRENCY_NAME.EUR}
                        name={CURRENCY_NAME.EUR}
                        type={'number'}
                        value={convertedValues.eurValue}
                        onChange={onChangeInput}/>
                    <img src={EUImage} alt='EU'/>
                </div>
                <div className={'input-plus-image'}>
                    <Input
                        id={CURRENCY_NAME.CHF}
                        name={CURRENCY_NAME.CHF}
                        type={'number'}
                        value={convertedValues.chfValue}
                        onChange={onChangeInput}/>
                    <img src={SwitzerlandImage} alt='Switzerland'/>
                </div>
            </>}
        </form>
    );
}
