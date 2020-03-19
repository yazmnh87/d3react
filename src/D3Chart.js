import * as d3 from "d3";
const data = [20, 16, 12, 14, 18];

export default function D3Chart(element) {
  const svg = d3
    .select(element.current)
    .append("svg")
    .attr("height", 500)
    .attr("width", 500);

   const rects = svg.selectAll("rect").data(data)
        rects.enter()
        .append("rect")
        .attr("x", (d,i)=> i * 100)
        .attr("Y",50)
        .attr("width", 50)
        .attr("height", d=> d)
        .attr("fill", "blue")
    }
