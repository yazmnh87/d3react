import * as d3 from "d3";
const data = [20, 16, 12, 14, 18];

export default function D3Chart(element) {
  const svg = d3
    .select(element.current)
    .append("svg")
    .attr("height", 500)
    .attr("width", 500);

    svg.append("rect")
        .attr("x", 50)
        .attr("Y",50)
        .attr("width", 50)
        .attr("height", 100)
    }
