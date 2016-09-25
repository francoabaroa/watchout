var svg = d3.select('svg');
var h = 450;
var w = 700;
var gameScore = 0;
var highScore = 0;
var myCollisions = 0;
var current = d3.selectAll('.current > span');


var increaser = function() {
  gameScore++;
};

var clearer = function() {
  if (highScore < gameScore) {
    highScore = gameScore;
  }
  gameScore = 0;
};


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

var dataScore = function() {
  return [0].map(function(val, index) {
    return {
      text: Math.round(gameScore),
      myCollisions: myCollisions
    };
  });
};


var update = function() {
  var selection = current
    .data(dataScore)
    .text(function(d) {
      return d.text;
    });

  var nSelection = d3.selectAll('.highscore > span')
    .data(dataScore)
    .text(function(d) {
      if ( d.text < highScore) {
        return highScore;
      }
      return d.text;
    });

  var nSelection = d3.selectAll('.collisions > span')
      .data(dataScore)
      .text(function(d) {
        return d.myCollisions;
      });
};
setInterval(update);

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
  .duration(1400)
  .ease('elastic')
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
      rx: 7,
      ry: 7,
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
  .on('mousedown', function() {
    setty = setInterval(increaser, 150);
  })
  .on('mouseup', function() {
    clearer();
    clearInterval(setty);
  })
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
  .attr('r', 20)
  .attr('fill', '#0FF1C3')
  .attr('stroke', 'black')
  .attr('stroke-width', 3)
  .on('mouseover', function() {
    clearer();
    d3.select('rect').
    style('fill', 'red');
  })
  .on('mouseout', function() {
    d3.select('rect').
    transition().
    style('fill', '#BADA55');
  })
  .transition()
  .each('end', function () {
    moveCircles();
  });
