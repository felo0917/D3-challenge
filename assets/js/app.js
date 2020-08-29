// Defining SVG area dimensions
const svgWidth = 960;
const svgHeight = 660;

// Defining the chart's margins as an object
const chartMargin = {
  top: 30,
  right: 30,
  bottom: 50,
  left: 50
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


  // Data import from csv 
d3.csv("assets/data/data.csv").then(function(dataJournalism){
  console.log(dataJournalism);

  //Parse Data
  dataJournalism.forEach(function (data) {
    data.poverty = +data.poverty;
    data.healthcare = +data.healthcare;
  });

  //Create scale functions
  const xLinearScale = d3.scaleLinear()
    .domain([5, d3.max(dataJournalism, d => d.poverty)])
    .range([0, chartWidth]);

  const yLinearScale = d3.scaleLinear()
    .domain([0, d3.max(dataJournalism, d => d.healthcare)])
    .range([chartHeight, 0]);

  //Create axis functions
  const bottomAxis = d3.axisBottom(xLinearScale);
  const leftAxis = d3.axisLeft(yLinearScale);

  // Append Axes to the chart
  chartGroup.append("g")
    .attr("transform", `translate(0, ${chartHeight})`)
    .call(bottomAxis);

  chartGroup.append("g")
    .call(leftAxis);

  // Create Circles
  const circlesGroup = chartGroup.selectAll("circle")
  .data(dataJournalism)
  .enter()
  .append("circle")
  .attr("cx", d => xLinearScale(d.poverty))
  .attr("cy", d => yLinearScale(d.healthcare))
  .attr("r", "15")
  .attr("fill", "blue")
  .attr("opacity", ".5");

  const textGroup = chartGroup.selectAll("text.abbr")
  .data(dataJournalism)
  .enter()
  .append("text")
  .attr("class", "abbr")
  .text(d => d.abbr)
  .attr("dx", d => xLinearScale(d.poverty))
  .attr("dy", d => yLinearScale(d.healthcare))
  .style("text-anchor", "middle")
  .style("font-size", "10px")

  // Intialize tool tip
  const toolTip = d3.tip()
    .attr("class", "tooltip")
    .offset([80, -60])
    .html(function (d) {
      return (`<br>Poverty: ${d.poverty}<br>Healthcare: ${d.healthcare}`);
    });

  // Create tooltip in the chart
  chartGroup.call(toolTip);

  // Create event listeners to display and hide the tooltip
  circlesGroup.on("click", function (data) {
    toolTip.show(data, this);
  })

    // onmouseout event
    .on("mouseout", function (data, index) {
      toolTip.hide(data);
    });

    textGroup.on("click", function (data) {
      toolTip.show(data, this);
    })
  
      // onmouseout event
      .on("mouseout", function (data, index) {
        toolTip.hide(data);
      });

  // Create axes labels
  chartGroup.append("text")
  .attr("transform", "rotate(-90)")
  .attr("y", 0 - chartMargin.left + -0)
  .attr("x", 0 - (chartHeight / 2))
  .attr("dy", "1em")
  .attr("class", "axisText")
  .text("Lacks Healthcare (%)");

  chartGroup.append("text")
  .attr("transform", `translate(${chartWidth / 2}, ${chartHeight + chartMargin.top + 0})`)
  .attr("class", "axisText")
  .text("In Poverty");
}).catch(function (error) {
console.log(error);







});




