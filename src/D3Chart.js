import React, { useState } from "react";
import * as d3 from "d3";
const MARGIN = { TOP: 50, RIGHT: 10, BOTTOM: 50, LEFT: 50 };
const WIDTH = 800 - MARGIN.LEFT - MARGIN.RIGHT;
const HEIGHT = 500 - MARGIN.TOP - MARGIN.BOTTOM;
export default function D3Chart(element, url) {
  const svg = d3
    .select(element.current)
    .append("svg")
    .attr("height", HEIGHT + MARGIN.TOP + MARGIN.BOTTOM)
    .attr("width", WIDTH + MARGIN.LEFT + MARGIN.RIGHT)
    .append("g")
    .attr("transform", `translate(${MARGIN.LEFT},${MARGIN.TOP})`);

  svg
    .append("text")
    .attr("x", WIDTH / 2)
    .attr("y", HEIGHT + 35)
    .attr("text-anchor", "middle")
    .text("The worlds tallest men");

  svg
    .append("text")
    .attr("x", -(HEIGHT / 2))
    .attr("y", -35)
    .attr("text-anchor", "middle")
    .text("Height")
    .attr("transform", "rotate(-90)");

  const xAxisGroup = svg
    .append("g")
    .attr("transform", `translate(0, ${HEIGHT})`);

  const yAxisGroup = svg.append("g");

  Promise.all([
    d3.json("https://udemy-react-d3.firebaseio.com/tallest_men.json"),
    d3.json("https://udemy-react-d3.firebaseio.com/tallest_women.json")
  ]).then(dataSets => {
    const [men, women] = dataSets
    let flag = true;
    let data = flag ? men : women;
    d3.interval(() => {
           update(data);
           flag = !flag;
         }, 1000);
  });

  // d3.json(url).then(data => {
  //   
  // });

  const update = data => {
    const max = d3.max(data, d => {
      return d.height;
    });

    const min = d3.min(data, d => d.height * 0.95);

    const y = d3
      .scaleLinear()
      .domain([min, max])
      .range([HEIGHT, 0]);

    const x = d3
      .scaleBand()
      .domain(data.map(d => d.name))
      .range([0, WIDTH])
      .padding(0.4);

    const xAxisCall = d3.axisBottom(x);

    xAxisGroup.call(xAxisCall);

    const yAxisCall = d3.axisLeft(y);
    yAxisGroup.call(yAxisCall);

    //enter data
    const rects = svg.selectAll("rect").data(data);

    //exit
    rects.exit().remove();

    //update
    rects
      .attr("x", (d, i) => x(d.name))
      .attr("y", d => y(d.height))
      .attr("width", x.bandwidth)
      .attr("height", d => HEIGHT - y(d.height));

    //enter
    rects
      .enter()
      .append("rect")
      .attr("x", (d, i) => x(d.name))
      .attr("y", d => y(d.height))
      .attr("width", x.bandwidth)
      .attr("height", d => HEIGHT - y(d.height))
      .attr("fill", "blue");
  };
}
