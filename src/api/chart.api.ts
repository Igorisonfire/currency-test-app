import {instance} from "./instance";
import IChart from '../models/chart.model'

interface IChartAPI {
    getChartData(): Promise<IChart.Segment[]>
    setChartData(data: IChart.Segment): Promise<void>
}

export const ChartAPI: IChartAPI = {

    async getChartData(): Promise<IChart.Segment[]> {
        try {
            const result = await instance.get('/values')
            return result.data
        } catch (error) {
            throw error
        }
    },

    async setChartData(data: IChart.Segment): Promise<void> {
        try {
            const result = await instance.post('/points', data)
            return result.data
        } catch (error) {
            throw error
        }
    }
}