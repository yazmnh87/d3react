import * as d3 from "d3";
const data = [20, 16, 12, 14, 18];
const url = `https://udemy-react-d3.firebaseio.com/tallest_men.json`
const MARGIN = {TOP: 50, RIGHT: 10, BOTTOM: 50, LEFT: 50}
const WIDTH = 800 - MARGIN.LEFT - MARGIN.RIGHT;
const HEIGHT = 500 - MARGIN.TOP - MARGIN.BOTTOM;
export default function D3Chart(element) {
  const svg = d3
    .select(element.current)
    .append("svg")
    .attr("height", HEIGHT + MARGIN.TOP + MARGIN.BOTTOM)
    .attr("width", WIDTH + MARGIN.LEFT + MARGIN.RIGHT)
    .append("g")
    .attr("transform", `translate(${MARGIN.LEFT},${MARGIN.TOP})`)

d3.json(url).then(data => {
const max = d3.max(data, d => {
    return d.height
})

const min = d3.min(data, d => d.height * .95)

const y = d3.scaleLinear()
.domain([min, max])
.range([HEIGHT,0])

const x = d3.scaleBand()
.domain(data.map(d => d.name))
.range([0, WIDTH])
.padding(0.4)

const xAxisCall = d3.axisBottom(x)
svg.append("g").attr("transform", `translate(0, ${HEIGHT})`).call(xAxisCall)

const yAxisCall = d3.axisLeft(y)
svg.append("g").call(yAxisCall)

svg.append("text")
.attr("x", WIDTH / 2)
.attr("y", HEIGHT + 35)
.attr("text-anchor", "middle")
.text("The worlds tallest men")

svg.append("text")
.attr("x", -(HEIGHT /2))
.attr("y", -35)
.attr("text-anchor", "middle")
.text("Height")
.attr("transform","rotate(-90)")

   const rects = svg.selectAll("rect")
        .data(data)

        rects.enter()
        .append("rect")
            .attr("x", (d,i)=> x(d.name))
            .attr("y", d => y(d.height))
            .attr("width", x.bandwidth)
            .attr("height", d => HEIGHT - y(d.height))
            .attr("fill", "blue")
})

    }
