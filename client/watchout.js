var svg = d3.select('svg');
var h = 450;
var w = 700;

var dragstarted = function (d) {
  d3.event.sourceEvent.stopPropagation();
  d3.select(this).classed('dragging', true);
};

var dragged = function (d) {
  d3.select(this)
  .attr('cx', d.x = d3.event.x)
  .attr('cy', d.y = d3.event.y);
};

var dragended = function (d) {
  d3.select(this).classed('dragging', false);
};

var drag = d3.behavior.drag()
  .origin(function (d) { return d; })
  .on('dragstart', dragstarted)
  .on('drag', dragged)
  .on('dragend', dragended);



var makeCircles = function () {
  return [1, 2, 3, 4, 5, 6, 7, 8, 9, 10, 11, 12, 13, 14, 15].map(function (val, index) {
    return {
      x: Math.random() * w,
      y: Math.random() * h,
      i: index
    };
  });
};

var moveCircles = function () {
  svg.selectAll('circle')
  .transition()
  .duration(800)
  .attr('cx', function(d, i) { return (Math.random() * w + 50 + i); })
  .attr('cy', function(d, i) { return (Math.random() * h + 50 + i); })
  .each('end', function () {
    moveCircles();
  });
};

var makePlayer = function() {
  return [0].map(function(val, index) {
    return {
      x: 320,
      y: 230,
      rx: 10,
      ry: 10,
      i: 0
    };
  });
};


svg.selectAll('ellipse')
  .data(makePlayer)
  .enter()
  .append('ellipse')
  .attr('cx', function(d) {
    return d.x; 
  })
  .attr('cy', function(d) {
    return d.y; 
  })
  .attr('rx', function(d) {
    return d.rx; 
  })
  .attr('ry', function(d) {
    return d.ry; 
  })
  .attr('fill', '#fF02C35'
  )
  .attr('stroke', 'black' 
  )
  .attr('stroke-width', '3' 
  )
  .call(drag);

  

svg.selectAll('circle')
  .data(makeCircles)
  .enter().append('circle')
  .attr('cx', function (d) {
    return d.x;
  })
  .attr('cy', function(d) {
    return d.y;
  })
  .attr('r', 10)
  .attr('fill', '#0FF1C3')
  .attr('stroke', 'black')
  .attr('stroke-width', 3)
  .transition()
  .each('end', function () {
    moveCircles();
  });














// // start slingin' some d3 here.
// var svg = d3.select('.board').append('svg')
//   .attr('width', '1400')
//   .attr('height', '600')
//   .attr('fill', 'black');

// var rect = svg.append('rect')
//   .attr('x', 150)
//   .attr('y', 150)
//   .attr('width', 1000)
//   .attr('height', 500)
//   .attr('fill', '#d3d3d3')
//   .on(mouseenter, )


// console.log(curentscore.select('current > span'))

// var circlesObj = [{
//   id: 1, r: 10
// }, {
//   id: 2, r: 10
// }, {
//   id: 3, r: 10
// }, {
//   id: 4, r: 10
// }, {
//   id: 5, r: 10
// }, {
//   id: 6, r: 10
// }, {
//   id: 7, r: 10
// }, {
//   id: 8, r: 10
// }, {
//   id: 9, r: 10
// }, {
//   id: 10, r: 10
// }];

// var ellipse = svg.selectAll('ellipse');

// var circle = svg.selectAll('circle');


// var slide = function() {
//   var circle = d3.selectAll('circle');
//   (function repeat() {
//     circle = circle.transition()
//       .attr('cx', function() { return (Math.random() * 900 + 200); })
//       .attr('cy', function() { return (Math.random() * 400 + 200); })
//       .transition()
//       .duration(1000)
//       .each('end', repeat);
//   })();
// };

// var eWidth = 650;
// var eHeight = 400;


// var make = function (data) {
//   circle
//     .data(data, function (d) { return d.id; })
//     .enter().append('circle')
//     .attr('cy', function() { return (Math.random() * 400 + 200); })
//     .attr('fill', 'blue')
//     .attr('cx', function() { return (Math.random() * 400 + 200); })
//     .attr('r', 10)
//     .each(slide);
// };




// make(circlesObj);



// // var started = function() {
// //   var ellipse = d3.select(this).classed('dragging', true);

// //   d3.event.on('drag', dragged).on('end', ended);

// //   var dragged = function(d) {
// //     ellipse.raise().attr('cx', d.x = d3.event.x).attr('cy', d.y = d3.event.y);
// //   };
// //   var ended = function() {
// //     ellipse.classed('dragging', false);
// //   };
// // };

// // setInterval(function() {
// //   update();
// // }, 1000);



// // var update = function() {
// //   circle
// //     .transition()
// //     .duration(1000)
// //     .attr('cy', function() { return (Math.random() * 400 + 200); })
// //     .attr('cx', function() { return (Math.random() * 400 + 200); });
// // };

