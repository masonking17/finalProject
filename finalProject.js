var promise = d3.csv("KenGriffeyJrData.csv");

promise.then(function(data)

{
  console.log(data)
})

var promise = d3.csv("MikeTroutData.csv");

promise.then(function(data)

{
    console.log(data)
})

var setup = function(statsGraph)
{
    d3.select("svg")
    .attr("width", screen.width)
    .attr("height", screen.height)
    .append("g")
    .attr("id", "graph")
    .attr("transform", "translate("+margins.left+", "+margins.top+")");
    
var width = screen.width - margins.left - margins.right;
var height = screen.height - margins.top - margins.bottom;
    
var xScale = d3.scaleLinear()
            .domain([0,20])
            .range([0, width])

var yScale = d3.scaleLinear()
            .domain([0,20])
            .range([height,0])

var xAxis = d3.axisBottom(xScale)
var yAxis = d3.axisLeft(yScale)
d3.select("svg")
    .append("g")
    .classed("axis", true);
    
d3.select(".axis")
    .append("g")
    .attr("id", "xAxis")
    .attr("transform", "translate("+margins.left+", "+(margins.top+height)+")")
    .call(yAxis)
    
}


var drawArrray = function(statsGraph, xScale, yScale)
{
    var array = d3.select("#graph")
    .selectAll("g")
    .data(statsGraph)
    .enter()
    .append("g")
    .attr("fill", "none")
   
var lineGenerator = d3.line()
    .x(function(num,index){ return xScale(index)})
    .y(function(num){ return yScale(num)})
    .curve(d3.curveNatural)

arrays.datum(function(obj){ return obj.arr})
    .append('path')
    .attr("d", lineGenerator)
    
}