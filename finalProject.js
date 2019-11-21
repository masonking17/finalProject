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