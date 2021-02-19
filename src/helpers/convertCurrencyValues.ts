import {CURRENCY_NAME} from '../const/currency.const'
import {transformCurrencyValue} from './transformCurrencyValue'
import ICurrency from '../models/currency.model'

export const convertCurrencyValues = (quotes: ICurrency.Quotes, value: string, currencyName: string) => {
    let convertedValues = null

    const EURCHF = +(quotes.USDCHF / quotes.USDEUR).toFixed(6)

    switch (currencyName) {
        case CURRENCY_NAME.USD: {
            convertedValues = {
                usdValue: value,
                eurValue: transformCurrencyValue(+value * quotes.USDEUR),
                chfValue: transformCurrencyValue(+value * quotes.USDCHF)
            }
            break
        }
        case CURRENCY_NAME.EUR: {
            convertedValues = {
                usdValue: transformCurrencyValue(+value / quotes.USDEUR),
                eurValue: value,
                chfValue: transformCurrencyValue(+value * EURCHF)
            }
            break
        }
        case CURRENCY_NAME.CHF: {
            convertedValues = {
                usdValue: transformCurrencyValue(+value / quotes.USDCHF),
                eurValue: transformCurrencyValue(+value / EURCHF),
                chfValue: value
            }
            break
        }
        default: break
    }

    return convertedValues
}