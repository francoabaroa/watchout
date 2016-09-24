var svg = d3.select('svg');
var h = 450;
var w = 700;
var gameScore = 0;
var highScore = 0;
var myCollisions = 0;

var stop = function() {
  if (gameScore > highScore) {
    highScore = gameScore;
  }
  gameScore = 0;
  t.restart(function(elapsed) {
    gameScore = Math.round(elapsed);
  }, 150);
};

var t = d3.timer(function(elapsed) {
  gameScore = elapsed;
  
}, 150);


var dragstarted = function (d) {
  d3.event.sourceEvent.stopPropagation();
  d3.select(this).classed('dragging', true);

  
  d3.selectAll('.current > span')
  .text(t);
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

var updateScore = function() {
  return [0].map(function(val, index) {
    return {
      text: Math.round(gameScore),
      myCollisions: myCollisions
    };
  });
};


var update = function() {
  // Update selection: Resize and position existing 
  // DOM elements with data bound to them.
  var selection = d3.selectAll('.current > span')
    .data(updateScore)
    .text(function(d) {
      return d.text;
    });

  var nSelection = d3.selectAll('.highscore > span')
    .data(updateScore)
    .text(function(d) {
      if ( d.text < highScore) {
        return highScore;
      }
      return d.text;
    });

  var nSelection = d3.selectAll('.collisions > span')
    .data(updateScore)
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
  .on('mouseover', function() {
    stop();
    myCollisions ++;
  })
  .transition()
  .each('end', function () {
    moveCircles();
  });




//if any cy or cx +10 for any enemy === the x,y +10 for the player
//gameScore = 0 