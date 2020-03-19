import * as d3 from "d3";
const url = `https://udemy-react-d3.firebaseio.com/ages.json`;

export default function D3Chart(element) {
  const svg = d3
    .select(element.current)
    .append("svg")
    .attr("height", 500)
    .attr("width", 500);

  d3.json(url).then(data => {
    console.log(data);
    const rects = svg.selectAll("rect").data(data);

    rects
      .enter()
      .append("rect")
      .attr("x", (d, i) => i * 100)
      .attr("y", 50)
      .attr("width", 50)
      .attr("height", d => d.age * 10)
      .attr("fill", d => {
        if (d.name === "Tony") {
          return "red";
        }  return "green"
      });
  });
}
