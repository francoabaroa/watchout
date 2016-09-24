// start slingin' some d3 here.
var svg = d3.select('.board').append('svg')
  .attr('width', '1400')
  .attr('height', '600')
  .attr('fill', 'black');

var rect = svg.append('rect')
  .attr('x', 150)
  .attr('y', 150)
  .attr('width', 1000)
  .attr('height', 500)
  .attr('fill', '#d3d3d3');
 

var circlesObj = [{
  id: 1, r: 10
}, {
  id: 2, r: 10
}, {
  id: 3, r: 10
}, {
  id: 4, r: 10
}, {
  id: 5, r: 10
}, {
  id: 6, r: 10
}, {
  id: 7, r: 10
}, {
  id: 8, r: 10
}, {
  id: 9, r: 10
}, {
  id: 10, r: 10
}];

var circle = svg.selectAll('circle');

var slide = function() {
  var circle = d3.select(this);
  (function repeat() {
    circle = circle.transition()
        .attr('cx', function() { return (Math.random() * 900 + 200); })
        .attr('cy', function() { return (Math.random() * 400 + 200); })
      .transition()
      .duration(1000)
        .each('end', repeat);
  })();
};


var make = function (data) {
  circle
  .data(data, function (d) { return d.id; })
  .enter().append('circle')
  .attr('cy', function() { return (Math.random() * 400 + 200); })
  .attr('fill', 'blue')
  .attr('cx', function() { return (Math.random() * 400 + 200); })
  .attr('r', 10)
  .each(slide);
};

make(circlesObj);

// setInterval(function() {
//   update();
// }, 1000);



// var update = function() {
//   circle
//     .transition()
//     .duration(1000)
//     .attr('cy', function() { return (Math.random() * 400 + 200); })
//     .attr('cx', function() { return (Math.random() * 400 + 200); });
// };

