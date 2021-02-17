import IChart from '../models/chart.model'

export const sortChartData = (data: IChart.Segment[]) => {
    let lineAvg: IChart.Point[] = []
    let lineMax: IChart.Point[] = []
    let lineMin: IChart.Point[] = []

    data.forEach((segment: IChart.Segment) => {
        lineAvg = [
            ...lineAvg,
            {
                value: segment.avg,
                date: segment.x
            }
        ]
        lineMax = [
            ...lineMax,
            {
                value: segment.max,
                date: segment.x
            }
        ]
        lineMin = [
            ...lineMin,
            {
                value: segment.min,
                date: segment.x
            }
        ]
    })

    return {
        avg: lineAvg,
        max: lineMax,
        min: lineMin
    }
}