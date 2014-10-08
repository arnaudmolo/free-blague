'use strict';

var d3, container, cursor, arc, PI, widthScale;

d3         = require('./../../../bower_components/d3/d3');
widthScale = d3.scale.linear();


widthScale
    .domain([0, 1200])
    .range([0, 50])

document.body.addEventListener('mousemove', function(e){

  container
    .style('transform', 'translate(' + (e.x - 50) + 'px, ' + (e.y - 50) + 'px)')

  cursor
    .attr('d', arc.innerRadius(widthScale(e.x))());

}, false);

arc = d3.svg.arc()
PI  = Math.PI

arc
    .innerRadius(function(d){
      return d;
    })
    .outerRadius(50)
    .startAngle(0)
    .endAngle(PI*2)

container = d3.select(document.getElementById('svg'));

cursor = container
  .selectAll('path.cursor')
  .data([{}])

cursor
  .enter()
  .append('path')
  .attr('class', 'cursor')

cursor
  .style('fill', 'red')
  .style('opacity', 1)
  .attr('d', arc(40))
  .attr('transform', 'translate(50, 50)');
