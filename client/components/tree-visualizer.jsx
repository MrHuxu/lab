import React, { Component } from 'react';
import { select, line } from 'd3';
import { Input, Button } from 'antd';
const { TextArea } = Input;

const drawGraph = (node, data) => {
  let height = 0;
  let len = data.length;
  while (len > 0) {
    len -= Math.pow(2, height);
    ++height;
  };

  let xs = [];
  let ys = [];
  for (let h = height - 1; h >= 0; --h) {
    const x = [];
    for (let i = 0; i < Math.pow(2, h); ++i) {
      if (xs.length) {
        x.push((xs[i * 2] + xs[i * 2 + 1]) / 2);
      } else {
        x.push(i * 50);
      }
      ys.unshift(50 * h);
    }
    xs = [...x, ...xs];
  }

  const container = select(node).append('svg')
    .attr('width', 600)
    .attr('height', 400);

  const circles = container.append('g')
    .attr('transform', 'translate(20,20)');

  circles.selectAll('circle')
    .data(data)
    .enter()
    .append('circle')
    .text(d => d)
    .attr('cx', (d, i) => xs[i])
    .attr('cy', (d, i) => ys[i])
    .attr('r', (d) => null === d || undefined === d ? 0 : 15)
    .attr('fill', 'white')
    .attr('stroke', '#94C6ED')
    .attr('stroke-width', 1.5);

  const texts = container.append('g')
    .attr('transform', 'translate(20,20)');

  texts.selectAll('text')
    .data(data)
    .enter()
    .append('text')
    .attr('x', (d, i) => xs[i] - 9)
    .attr('y', (d, i) => ys[i] + 4)
    .text(d => d)
    .attr('font-family', 'sans-serif')
    .attr('font-size', '12px')
    .attr('fill', '#685BA3');

  const lines = container.append('g')
    .attr('transform', 'translate(20,20)');

  const lineData = [];
  for (let i = 1; i <= parseInt(data.length / 2); ++i) {
    const left = i * 2 - 1;
    const right = i * 2;

    if (data[left] !== null && data[left] !== undefined) {
      lineData.push([
        { x: xs[i - 1], y: ys[i - 1] + 15 },
        { x: xs[left], y: ys[left] - 15 }
      ]);
    }
    if (data[right] !== null && data[right] !== undefined) {
      lineData.push([
        { x: xs[i - 1], y: ys[i - 1] + 15 },
        { x: xs[right], y: ys[right] - 15 }
      ]);
    }
  }

  const lineFunction = line()
    .x(function (d) { return d.x; })
    .y(function (d) { return d.y; });

  lineData.forEach(l => {
    lines.append('path')
      .attr('d', lineFunction(l))
      .attr('stroke', '#D6909E')
      .attr('stroke-width', 1.5)
      .attr('fill', 'none');
  });
};

class TreeVisualizer extends Component {
  state = {
    data : [1, 4, 5, 4, 4, null, 5]
  }

  render () {
    const { data } = this.state;

    return (
      <div>
        <div>
          <TextArea rows={ 4 } placeholder="[1, 4, 5, 4, 4, null, 5]" />
          <Button type="primary">Visualize</Button>
        </div>
        <div ref={ node => drawGraph(node, data) } />
      </div>
    );
  }
}

export default TreeVisualizer;
