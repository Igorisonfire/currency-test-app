import React, {useEffect, useRef} from 'react';
import { useSelector, useDispatch } from 'react-redux';
import {getChartData, selectChartLines} from './chartSlice';
import './Chart.scss';
import * as d3 from 'd3';
import IChart from '../../models/chart.model'
import {ChartForm} from './ChartForm'

export function Chart() {
  const chartLines = useSelector(selectChartLines);
  const dispatch = useDispatch();
  const d3Container = useRef(null);

  useEffect(() => {
    dispatch(getChartData())
  }, [])

  useEffect(() => {
    if (chartLines && d3Container.current) {

      const dataMin: IChart.Point[] = chartLines.min
      const dataAvg: IChart.Point[] = chartLines.avg
      const dataMax: IChart.Point[] = chartLines.max

      const width = 800;
      const height = 800;
      const margin = ({top: 20, right: 30, bottom: 30, left: 40})

      const line = d3.line()
          .defined((d: any) => !isNaN(d.value))
          .x((d: any) => x(new Date(d.date)))
          .y((d: any) => y(d.value))
          .curve(d3.curveCardinal)

      const x = d3.scaleUtc()
          .domain(d3.extent(dataMin, d => new Date(d.date)) as any)
          .range([margin.left, width - margin.right])

      const y = d3.scaleLinear()
          .domain([0, d3.max(dataMin, d => d.value)] as any).nice()
          .range([height - margin.bottom, margin.top])

      const xAxis = (g: any) => g
          .attr("transform", `translate(0,${height - margin.bottom})`)
          .call(d3.axisBottom(x).ticks(width / 100).tickSizeOuter(0))

      const yAxis = (g: any) => g
          .attr("transform", `translate(${margin.left},0)`)
          .call(d3.axisLeft(y))
          .call((g: any) => g.select(".tick:last-of-type text").clone()
              .attr("x", 3)
              .attr("text-anchor", "start")
              .text('Value'))


      const svg = d3.select(d3Container.current)
          .attr("viewBox", [0, 0, width, height] as any);

      svg.select(".x-axis").call(xAxis);

      svg.select(".y-axis").call(yAxis);

      svg.select(".max-path")
          .datum(dataMax)
          .transition()
          .duration(300)
          .attr("fill", "none")
          .attr("stroke", "#00C853")
          .attr("stroke-width", 1.5)
          .attr("stroke-linejoin", "round")
          .attr("stroke-linecap", "round")
          .attr("d", line as any);

      svg.select(".avg-path")
          .datum(dataAvg)
          .transition()
          .duration(300)
          .attr("fill", "none")
          .attr("stroke", "#FFD600")
          .attr("stroke-width", 1.5)
          .attr("stroke-linejoin", "round")
          .attr("stroke-linecap", "round")
          .attr("d", line as any);

      svg.select(".min-path")
          .datum(dataMin)
          .transition()
          .duration(300)
          .attr("fill", "none")
          .attr("stroke", "#D50000")
          .attr("stroke-width", 1.5)
          .attr("stroke-linejoin", "round")
          .attr("stroke-linecap", "round")
          .attr("d", line as any);
    }

  }, [chartLines, d3Container.current])

  return (
    <div className={'chart-wrapper'}>
      <ChartForm/>
      <svg
          className="d3-component"
          width={800}
          height={800}
          ref={d3Container}
      >
        <g className={"x-axis"}/>
        <g className={"y-axis"}/>
        <path className={'min-path'}/>
        <path className={'avg-path'}/>
        <path className={'max-path'}/>
      </svg>
    </div>
  );
}
