import ICurrency from '../models/currency.model'
import {CURRENCY_NAME} from '../const/currency.const'
import {dateToChartText} from './dateToString'

export const sortDataToChart = (data: ICurrency.ModelLocal[], ratesName: string) => {

    let chartData: ICurrency.ChartDataSegment[] = []

    for (let i = 0; i < 14; i++) {
        switch (ratesName) {
            case CURRENCY_NAME.USD + CURRENCY_NAME.EUR: {
                const segment: ICurrency.ChartDataSegment = {
                    value: +data[i].quotes.USDEUR.toFixed(3),
                    date: dateToChartText(data[i].date)
                }

                chartData = [...chartData, segment]
                break
            }
            case CURRENCY_NAME.USD + CURRENCY_NAME.CHF: {
                const segment: ICurrency.ChartDataSegment = {
                    value: +data[i].quotes.USDCHF.toFixed(3),
                    date: dateToChartText(data[i].date)
                }

                chartData = [...chartData, segment]
                break
            }
            case CURRENCY_NAME.EUR + CURRENCY_NAME.CHF: {
                const EURCHF = +(data[i].quotes.USDCHF / data[i].quotes.USDEUR).toFixed(3)

                const segment: ICurrency.ChartDataSegment = {
                    value: EURCHF,
                    date: dateToChartText(data[i].date)
                }

                chartData = [...chartData, segment]
                break
            }
            case CURRENCY_NAME.EUR + CURRENCY_NAME.USD: {
                const EURUSD = +(data[i].quotes.USDUSD / data[i].quotes.USDEUR).toFixed(3)

                const segment: ICurrency.ChartDataSegment = {
                    value: EURUSD,
                    date: dateToChartText(data[i].date)
                }

                chartData = [...chartData, segment]
                break
            }
            case CURRENCY_NAME.CHF + CURRENCY_NAME.USD: {
                const CHFUSD = +(data[i].quotes.USDUSD / data[i].quotes.USDCHF).toFixed(3)

                const segment: ICurrency.ChartDataSegment = {
                    value: CHFUSD,
                    date: dateToChartText(data[i].date)
                }

                chartData = [...chartData, segment]
                break
            }
            case CURRENCY_NAME.CHF + CURRENCY_NAME.EUR: {
                const CHFEUR = +(data[i].quotes.USDEUR / data[i].quotes.USDCHF).toFixed(3)

                const segment: ICurrency.ChartDataSegment = {
                    value: CHFEUR,
                    date: dateToChartText(data[i].date)
                }

                chartData = [...chartData, segment]
                break
            }
            default:
                break
        }
    }

    return chartData
}