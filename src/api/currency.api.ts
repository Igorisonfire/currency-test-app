import {dateToString} from '../helpers/dateToString'
import ICurrency from '../models/currency.model'

const CurrencyLayerClient = require('currencylayer-client')
const client = new CurrencyLayerClient({apiKey: '5f10a68b472c4e3f3bb2108c08e24178'})

interface ICurrencyAPI {
    getCurrencyData(date?: Date): Promise<ICurrency.ModelApi>
}

export const CurrencyAPI: ICurrencyAPI = {

    async getCurrencyData(date?: Date): Promise<ICurrency.ModelApi> {

        const stringDate = date ? dateToString(date) : dateToString(new Date())

        try {
            const result = await client.historical({currencies: ['EUR', 'USD', 'CHF'], date: stringDate})
            return result
        } catch (error) {
            throw error
        }
    }
}