import {AppThunk} from '../../store/store'
import {dateToString} from '../../helpers/dateToString'
import {CurrencyAPI} from '../../api/currency.api'
import {setErrorMessage} from '../messages/slice'
import {CURRENCY_NAME, CURRENCY_OPTION, SELECT_POSITION} from '../../const/currency.const'
import {
    setConvertValues,
    setCurrentQuotes,
    setDataArray,
    setDataSegment,
    setIsFetching,
    setSelectedChartGroup,
    updateChartData
} from './slice'

export const getStartData = (): AppThunk => async (dispatch, getState) => {

    dispatch(setIsFetching(true))

    //get and set data from localstorage (if we have it there)
    const localCurrencyData = localStorage.getItem('localCurrencyData')
    const localCurrencyDataArray = localCurrencyData ? JSON.parse(localCurrencyData) : []
    localCurrencyDataArray.length && dispatch(setDataArray(localCurrencyDataArray))


    //get data for las 14 days (other than those available in the localstorage)
    for (let i = 0; i < 14; i++) {
        let date = new Date();
        date.setDate(date.getDate() - i);

        const stateData = getState().currency.data

        if(!stateData.length || !stateData[i] || stateData[i].date !== dateToString(date)) {
            try {
                const response = await CurrencyAPI.getCurrencyData(date)
                dispatch(setDataSegment(response))
            } catch (error) {
                dispatch(setIsFetching(false))
                dispatch(setErrorMessage(new Error(error).message))
                console.log(error)
                break
            }
        }
    }

    //start initialization
    dispatch(setCurrentQuotes({quotes: getState().currency.data[0].quotes, date: getState().currency.data[0].date}))
    dispatch(setConvertValues({value: '1', currencyName: CURRENCY_NAME.USD}))
    dispatch(setSelectedChartGroup({option: CURRENCY_OPTION.USD, position: SELECT_POSITION.FIRST}))
    dispatch(setSelectedChartGroup({option: CURRENCY_OPTION.EUR, position: SELECT_POSITION.SECOND}))
    dispatch(updateChartData())

    //set updated data to localstorage
    localStorage.setItem("localCurrencyData", JSON.stringify(getState().currency.data))

    dispatch(setIsFetching(false))
}

export const getCurrentData = (date: Date): AppThunk => async (dispatch, getState) => {

    const stateData = getState().currency.data

    //check and set data for selected day from localstorage (if we have it there)
    for (let i = 0; i < stateData.length; i++) {
        if (stateData[i].date === dateToString(date)){
            dispatch(setCurrentQuotes({quotes: stateData[i].quotes, date: dateToString(date)}))
            dispatch(setConvertValues({value: '1', currencyName: CURRENCY_NAME.USD}))
            return
        }
    }

    //get data for selected day and set it to localstorage
    try {
        const response = await CurrencyAPI.getCurrencyData(date)
        dispatch(setDataSegment(response))
        dispatch(setCurrentQuotes({quotes: response.quotes, date: dateToString(date)}))
        dispatch(setConvertValues({value: '1', currencyName: CURRENCY_NAME.USD}))
        localStorage.setItem("localCurrencyData", JSON.stringify(getState().currency.data));
    } catch (error) {
        dispatch(setErrorMessage(new Error(error).message))
        console.log(error)
    }
}