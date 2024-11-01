import React, { useEffect, useRef } from 'react';
import * as d3 from 'd3';
import './App.css';

const App = () => {
  const chartRef = useRef();

  useEffect(() => {
    const data = [
      { name: 'A', value: 30 },
      { name: 'B', value: 80 },
      { name: 'C', value: 45 },
      { name: 'D', value: 60 },
      { name: 'E', value: 20 },
      { name: 'F', value: 90 },
      { name: 'G', value: 55 },
    ];

    const svg = d3.select(chartRef.current)
      .attr('width', 600)
      .attr('height', 400);

    const x = d3.scaleBand()
      .domain(data.map(d => d.name))
      .range([0, 600])
      .padding(0.4);

    const y = d3.scaleLinear()
      .domain([0, 100])
      .range([400, 0]);

    svg.append('g')
      .attr('transform', 'translate(0,400)')
      .call(d3.axisBottom(x));

    svg.append('g')
      .call(d3.axisLeft(y));

    svg.selectAll('.bar')
      .data(data)
      .enter()
      .append('rect')
      .attr('class', 'bar')
      .attr('x', d => x(d.name))
      .attr('y', d => y(d.value))
      .attr('width', x.bandwidth())
      .attr('height', d => 400 - y(d.value))
      .attr('fill', '#69b3a2');
  }, []);

  return (
    <div className="App">
      <h1>Data Dashboard</h1>
      <svg ref={chartRef}></svg>
    </div>
  );
};

export default App;