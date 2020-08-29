// Defining SVG area dimensions
const svgWidth = 960;
const svgHeight = 660;

// Defining the chart's margins as an object
const chartMargin = {
  top: 30,
  right: 30,
  bottom: 30,
  left: 30
};


// Define dimensions of the chart area
const chartWidth = svgWidth - chartMargin.left - chartMargin.right;
const chartHeight = svgHeight - chartMargin.top - chartMargin.bottom;

// Select scatter from div id, append SVG area to it, and set the dimensions
const svg = d3.select("#scatter")
  .append("svg")
  .attr("height", svgHeight)
  .attr("width", svgWidth);

// Append a group to the SVG area and shift ('translate') it to the right and to the bottom
const chartGroup = svg.append("g")
  .attr("transform", `translate(${chartMargin.left}, ${chartMargin.top})`);


//Parameters
let xAxis = "age";
let yAxis = "smokes";

// Create a scale for your independent (x) coordinates
function xScale(dataJournalism, xAxis){
    const xLinearScale = d3.scaleLinear()
        .domain([d3.min(dataJournalism, d => d.xAxis)])
        .d3.max(dataJournalism, d => d.xAxis)
        
        .range([0, chartWidth]);

        return xLinearScale;

}

// Create a scale for your dependent (y) coordinates
function yScale(dataJournalism, yAxis){
    const yLinearScale = d3.scaleLinear()
        .domain([d3.min(dataJournalism, d => d.xAxis)])
        .d3.max(dataJournalism, d => d.xAxis)
        
        .range([chartHeight, 0]);

        return yLinearScale;

}
// Data import from csv 
d3.csv("assets/data/data.csv").then(function(dataJournalism){
    console.log(dataJournalism);




});

