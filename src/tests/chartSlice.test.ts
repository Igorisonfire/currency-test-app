import {
    chartSlice, IChartState,
    setData, setNewSegment, setFetchingSend
} from '../features/chart/chartSlice'
import IChart from '../models/chart.model'

const initialState: IChartState = {
    data: [],
    lines: null,
    fetchingSend: false
};

const chartDataTest: IChart.Segment[] = [
    {x: "2021-02-16T23:44:14.284Z", avg: 97, min: 95, max: 108}
]

const linesTest: IChart.Lines = {
    avg: [
        {
            value: 97,
            date: "2021-02-16T23:44:14.284Z"
        }
    ],
    max: [
        {
            value: 108,
            date: "2021-02-16T23:44:14.284Z"
        }
    ],
    min: [
        {
            value: 95,
            date: "2021-02-16T23:44:14.284Z"
        }
    ],
}

const initialState2: IChartState = {
    data: chartDataTest,
    lines: linesTest,
    fetchingSend: false
};

const newSegmentTest: IChart.Segment = {x: "2021-02-14T23:44:14.284Z", avg: 58, min: 56, max: 67}

const chartDataTest2: IChart.Segment[] = [
    {x: "2021-02-14T23:44:14.284Z", avg: 58, min: 56, max: 67},
    {x: "2021-02-16T23:44:14.284Z", avg: 97, min: 95, max: 108}
]

const linesTest2: IChart.Lines = {
    avg: [
        {
            value: 58,
            date: "2021-02-14T23:44:14.284Z"
        },
        {
            value: 97,
            date: "2021-02-16T23:44:14.284Z"
        }
    ],
    max: [
        {
            value: 67,
            date: "2021-02-14T23:44:14.284Z"
        },
        {
            value: 108,
            date: "2021-02-16T23:44:14.284Z"
        }
    ],
    min: [
        {
            value: 56,
            date: "2021-02-14T23:44:14.284Z"
        },
        {
            value: 95,
            date: "2021-02-16T23:44:14.284Z"
        }
    ],
}

describe('chartSlice', () => {
    it('setData', () => {
        const result = chartSlice.reducer(initialState, setData(chartDataTest))
        const expectResult = {
            data: chartDataTest,
            lines: linesTest,
            fetchingSend: false
        }

        expect(result).toStrictEqual(expectResult)
    })

    it('setNewSegment', () => {
        const result = chartSlice.reducer(initialState2, setNewSegment(newSegmentTest))
        const expectResult = {
            data: chartDataTest2,
            lines: linesTest2,
            fetchingSend: false
        }

        expect(result).toStrictEqual(expectResult)
    })

    it('setFetchingSend', () => {
        const result = chartSlice.reducer(initialState, setFetchingSend(true))
        const expectResult = {
            data: [],
            lines: null,
            fetchingSend: true
        }

        expect(result).toStrictEqual(expectResult)
    })
});




