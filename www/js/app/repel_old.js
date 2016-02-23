define([], function () {

  return function (objects) {
    var multiplier = 50
    var figures = 100
    var dec = 1
    var group, execution = []

    function react (object1, object2) {
      var type1 = object1.label == "Rectangle Body"
      var type2 = object2.label == "Rectangle body"
      var m1 = object1.multiplier || 1
      var m2 = object2.multiplier || 1
      var x1 = object1.position.x
      var y1 = object1.position.y
      var x2 = object2.position.x
      var y2 = object2.position.y
      var xMin1 = type1 ? object1.vertices[0].x : 0
      var xMax1 = type1 ? object1.vertices[1].x : 0
      var yMin1 = type1 ? object1.vertices[1].y : 0
      var yMax1 = type1 ? object1.vertices[2].y : 0
      var xMin2 = type2 ? object2.vertices[0].x : 0
      var xMax2 = type2 ? object2.vertices[1].x : 0
      var yMin2 = type2 ? object2.vertices[1].y : 0
      var yMax2 = type2 ? object2.vertices[2].y : 0
      var dx = (x1 - x2) / (y1 - y2)
      var dy = (y1 - y2) / (x1 - x2)
      var distance = Math.abs( Math.pow(x1 - x2, 2) ) + Math.abs( Math.pow(y1 - y2, 2) )

      if (x1 < x2) dx = - Math.abs(dx); else dx = Math.abs(dx)
      if (y1 < y2) dy = - Math.abs(dy); else dy = Math.abs(dy)
      if (dx.isFinite || xMin2 < x1 && x1 < xMax2) dx = 0; if (dx > 1) dx = 1; if (dx < -1) dx = -1
      if (dy.isFinite || yMin2 < y1 && y1 < yMax2) dy = 0; if (dy > 1) dy = 1; if (dy < -1) dy = -1

      if (xMin1 < x2 && x2 < xMax1 && dy > 0) {dy = 1; distance = y2 - y1}
      if (xMin1 < x2 && x2 < xMax1 && dy < 0) {dy = -1; distance = y1 - y2}
      if (xMin2 < x1 && x1 < xMax2 && dy > 0) {dy1 = 1; distance = y1 - y1}
      if (xMin2 < x1 && x1 < xMax2 && dy < 0) {dy1 = -1; distance = y2 - y2}

      if (yMin1 < y2 && y2 < yMax1 && dx > 0) {dx = 1; distance = x2 - x1}
      if (yMin1 < y2 && y2 < yMax1 && dx < 0) {dx = -1; distance = x1 - x2}
      if (yMin1 < y2 && y2 < yMax1 && dx > 0) {dx = 1; distance = x2 - x1}
      if (yMin1 < y2 && y2 < yMax1 && dx < 0) {dx = -1; distance = x1 - x2}
      
      var dx1 = dx
      var dx2 = -dx
      var dy1 = dy
      var dy2 = -dy

      if (type1) {dx2 = dx2/dec; dy2 = dy2/dec}
      if (type2) {dx1 = dx1/dec; dy1 = dy1/dec}

      Matter.Body.applyForce(object1, {x: x1, y: y1}, {x: dx1 / distance * multiplier * m2, y: dy1 / distance * multiplier * m2})
      Matter.Body.applyForce(object2, {x: x2, y: y2}, {x: dx / distance * multiplier * m1, y: dy / distance * multiplier * m1})
    }

    function braid () {
      if (group.length > 0) {
        group.forEach(function (key) {
          if (key != group[0]) execution.push([group[0], key])
        })
        group.splice(0, 1)
        braid()
      } else {
        execution.forEach(function (pair) {
          react(pair[0], pair[1])
        })
      }
    }

    if (objects.length == 2) {
      react(objects[0], objects[1])
    } else if (objects.length > 2) {
      group = [].slice.call(objects)
      braid()
    } else {
      console.error('Coulomb.Repel() needs at least two objects (bodies) as arguments');
    }

  }

})
