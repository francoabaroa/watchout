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

var enemyMaker = function (n) {
  for (var i = 0; i < n; i++) {
    svg.append('circle')
    .attr('cx', (Math.random() * 750) + 200)
    .attr('cy', (Math.random() * 750) + 200)
    .attr('r', 10)
    .attr('fill', 'blue');
  }
};


d3.select('.board').select('svg').select('rect')
  .data([4, 8, 15, 16, 23, 42])
  .enter().append('circle')
    .attr('cx', 500 * Math.random())
    .attr('cy', 500 * Math.random())
    .attr('r', 10)
    .attr('fill', 'blue');

var circle = svg.append('circle')
  .attr('cx', 400)
  .attr('cy', 400)
  .attr('r', 10)
  .attr('fill', 'blue');



var inter = setInterval(function() {
  enemyMaker(10);
}, 1000);

enemyMaker(10);
