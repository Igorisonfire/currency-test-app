import * as React from 'react';
import "./index.scss";
import {AreaChart, Area, XAxis, YAxis, CartesianGrid, Tooltip, ResponsiveContainer} from 'recharts';
import ICurrency from '../../models/currency.model'

interface IProps {
    data: ICurrency.ChartDataSegment[]
}

export const ChartComponent = (props: IProps) => {
    const {data} = props
    const reverseData = data.slice().reverse()

    return (
        <div className={'chart-component'}>
            <ResponsiveContainer>
                <AreaChart data={reverseData} margin={{top: 10, right: 30, left: 0, bottom: 0,}}>
                    <defs>
                        <linearGradient id="customGradient" x1="0" y1="0" x2="0" y2="1">
                            <stop offset="5%" stopColor="#FF3D00" stopOpacity={0.6}/>
                            <stop offset="95%" stopColor="#FF9E80" stopOpacity={0.2}/>
                        </linearGradient>
                    </defs>
                    <CartesianGrid strokeDasharray="1"/>
                    <XAxis dataKey="date"/>
                    <YAxis domain={['dataMin - 0.008', 'dataMax + 0.008']}/>
                    <Tooltip content={<CustomChartTooltip/>} />
                    <Area type="linear" activeDot={{fill: '#FBE9E7', strokeWidth: 1, stroke: '#DD2C00'}}
                          dataKey="value" stroke="#DD2C00" fillOpacity={1} fill="url(#customGradient)"/>
                </AreaChart>
            </ResponsiveContainer>
        </div>
    )
}

interface ICustomTooltipProps {
    active?: boolean,
    payload?: any,
    label?: string
}

const CustomChartTooltip = (props: ICustomTooltipProps) => {
    const {active, payload, label} = props
    if (active && payload && payload.length) {
        return (
            <div className="custom-chart-tooltip">
                <p className={'value'}>{payload[0].value}</p>
                <p className={'date'}>{label}</p>
            </div>
        );
    }

    return null;
};