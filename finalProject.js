var promise = d3.csv("Data.csv");

promise.then(function(data)

{
  console.log(data)
    setup(data)
}),

    function(Error)
{
    return ("error", Error)
}

var screen = {width:600, height:750}
var margins = {top:10, right:50, bottom:50, left:50}

var setup = function(data)
{
    d3.select("svg")
    .attr("width", screen.width)
    .attr("height", screen.height)
    .append("g")
    .attr("id", "graph")
    .attr("transform", "translate("+margins.left+", "+margins.top+")");
    
/* var x = d3.scaleLinear().domain([1,8]).range([0,width]);
    .selectAll("svg")
    .append("g")
    .attr("transform", "translate(0," + height + ")")
    .call(d3.axisBottom(x));
    
var y = d3. scaleLinear().domain([1,8]).range([height, 0]);
    .select("svg")
    .append("g")
    .call(d3.axisLeft(y));
    
svg.append("text")
        .attr("text-anchor", "end")
        .attr("x", width)
        .attr("y", height + margin.top + 20)
        .text("Years");
    
svg.append("text")
        .attr("text-anchor", "end")
        .attr("transform", "rotate(-90)")
        .attr("y", -margin.left+20)
        .attr("x", -margin.top)
        .text("Percentage") */
    

    
var width = screen.width - margins.left - margins.right;
var height = screen.height - margins.top - margins.bottom;
    
var xScale = d3.scaleLinear()
            .domain([1, 8])
            .range([0, width])

var yScale = d3.scaleLinear()
            .domain([-1, 1])
            .range([height,0])

var xAxis = d3.axisBottom(xScale)
var yAxis = d3.axisLeft(yScale)
var cScale = d3.scaleOrdinal(d3.schemeTableau10)
d3.select("svg")
    .append("g")
    .attr("class", "axis");
    
d3.select(".axis")
    .append("g")
    .attr("id", "xAxis")
    .attr("transform", "translate("+margins.left+", "+(margins.top+height)+")")
    .call(xAxis)
    
d3.select(".axis")
    .append("g")
    .attr("id", "yAxis")
    .attr("transform", "translate("+margins.left+", "+ margins.top +")")
    .call(yAxis)
    
    drawLine(data, xScale, yScale, cScale, "OWAR")
    drawLine(data, xScale, yScale, cScale, "AOPS")
    drawLine(data, xScale, yScale, cScale, "OBP")
    drawLine(data, xScale, yScale, cScale, "SP")
    drawLine(data, xScale, yScale, cScale, "WAR")
    
}

var drawLine= function(data, xScale, yScale, cScale, dimension)
{
   
var arrays = d3.select("#graph")
    // .selectALL("#graph)
    // .data(data)
    // .enter()
    .append("g")
    .attr("fill", "none")
    .attr("stroke", cScale(dimension))
    .attr("stroke-width", 4)
    .on("mouseover", function(data)
        {
        d3.select(this)
        .attr("stroke", "black")
        .attr("stroke-width", "8")
        .raise(this);
    })
    .on("mouseout", function(data)
        {
        d3.select(this)
        .attr("stroke", cScale(dimension))
        .attr("stroke-width", 4)
    })
    
var lineGenerator= d3.line()
        .x(function(num) { return xScale(num.Years);})
        .y(function(num) { return yScale(num[dimension]);})
        // .curve(d3.curveMonotoneX)

arrays.append("path") 
    .datum(data)
    .attr("d", lineGenerator)
}