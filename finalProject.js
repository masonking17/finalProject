var promise = d3.csv("Data.csv");

promise.then(function(data)

{
  console.log(data.columns)
    setup(data)
}),

    function(Error)
{
    return ("error", Error)
}

var screen = {width:800, height:750}
var margins = {top:30, right:80, bottom:50, left:85}

var setup = function(data)
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
            .domain([1, 8])
            .range([0, width])

var yScale = d3.scaleLinear()
            .domain([-1, 1])
            .range([height,0])

var xAxis = d3.axisBottom(xScale)
var yAxis = d3.axisLeft(yScale)
var cScale = d3.scaleOrdinal(d3.schemeTableau10)

var svg = d3.select("svg")
    .append("svg")
    .attr("width", screen.width)
    .attr("height", screen.height)
    .attr("id", "graph")
    .attr("transform", "translate("+margins.left+", "+margins.top+")");
    
svg.append("text")
    .attr("transform", "translate("+ (width/2)+", "+(margins.top+ height + 50)+")")
    .style("text-anchor", "middle")
    .text("Year")
    
d3.select("svg")
    .append("g")
    .attr("class", "axis");
    
d3.select(".axis")
    .append("g")
    .attr("id", "xAxis")
    .attr("transform", "translate("+margins.left+", "+(margins.top+height)+")")
    .call(xAxis)
    
svg.append("svg")
     .attr("width", screen.width)
    .attr("height", screen.height)
    .attr("id", "graph")
    
    
svg.append("text")
    .attr("transform", "rotate(-90)")
    .attr("y", (margins.left-50))
    .attr("x", 0- (height/2))
    .attr("dy", "1em")
    .style("text-anchor", "middle")
    .text("Trout Percent Better Than Griffey")
    
d3.select("svg")
    .append("g")
    .attr("class", "axis");
    
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
    
d3.select(".OWAR")
    .on("click", function()
{
    d3.selectAll("#graph")
    .selectAll("g")
    .remove()
    
    drawLine(data, xScale, yScale, cScale, "OWAR")
})
    
d3.select(".AOPS")
    .text("Adjusted OPS")
    .on("click", function()
{
    d3.selectAll("#graph")
    .selectAll("g")
    .remove()
    
    drawLine(data, xScale, yScale, cScale, "AOPS")
})

d3.select(".OBP")
    .on("click", function()
{
    d3.selectAll("#graph")
    .selectAll("g")
    .remove()
    
    drawLine(data, xScale, yScale, cScale, "OBP")
})

d3.select(".SP")
    .on("click", function()
{
    d3.selectAll("#graph")
    .selectAll("g")
    .remove()
    
    drawLine(data, xScale, yScale, cScale, "SP")
})

d3.select(".WAR")
    .on("click", function()
{
    d3.selectAll("#graph")
    .selectAll("g")
    .remove()
    
    drawLine(data, xScale, yScale, cScale, "WAR")
})


    drawLegend(columns, cScale)
    
}
var columns = 
    ["OWAR","AOPS","OBP","SP","WAR"]
var drawLegend = function(columns, cScale)
{
    d3.select("svg")
        .append("g")
        .attr("id", "legend")
        .attr("transform", "translate("+(screen.width-margins.right - 10)+", "+(margins.top)+")");
      //console.log("data", data)       
var gs = d3.select("#legend")
.selectAll("g")
.data(columns)
.enter()
.append("g")
.attr("transform", function(columns,i)
{
    return "translate(0, "+(i*14)+")";
})
    
gs.append("rect").attr("width", 35).attr("height", 10).attr("fill", function(columns)
{
    return cScale(columns);

})
    
    
gs.append("text")
    .text(function(d){return d})
    .attr("x", 40)
    .attr("y", 10)
    //.attr("fill", "black")
    
}
var drawLine= function(data, xScale, yScale, cScale, dimension)
{
   //console.log(dimension)
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
        .attr("stroke", "gold")
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