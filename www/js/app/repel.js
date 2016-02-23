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
      var dx1 = (x1 - x2) / (y1 - y2)
      var dy1 = (y1 - y2) / (x1 - x2)
      var dx2 = (x2 - x1) / (y2 - y1)
      var dy2 = (y2 - y1) / (x2 - x1)
      var distance = Math.abs( Math.pow(x1 - x2, 2) ) + Math.abs( Math.pow(y1 - y2, 2) )

      if (x1 < x2) dx1 = - Math.abs(dx1); else dx1 = Math.abs(dx1)
      if (y1 < y2) dy1 = - Math.abs(dy1); else dy1 = Math.abs(dy1)
      if (x2 < x1) dx2 = - Math.abs(dx2); else dx2 = Math.abs(dx2)
      if (y2 < y1) dy2 = - Math.abs(dy2); else dy2 = Math.abs(dy2)
      if (dx1.isFinite || xMin2 < x1 && x1 < xMax2) dx1 = 0; if (dx1 > 1) dx1 = 1; if (dx1 < -1) dx1 = -1
      if (dy1.isFinite || yMin2 < y1 && y1 < yMax2) dy1 = 0; if (dy1 > 1) dy1 = 1; if (dy1 < -1) dy1 = -1
      if (dx2.isFinite || xMin1 < x2 && x2 < xMax1) dx2 = 0; if (dx2 > 1) dx2 = 1; if (dx2 < -1) dx2 = -1
      if (dy2.isFinite || yMin1 < y2 && y2 < yMax1) dy2 = 0; if (dy2 > 1) dy2 = 1; if (dy2 < -1) dy2 = -1

      if (xMin1 < x2 && x2 < xMax1 && dy2 > 0) {dy2 = 1; distance = y2 - y1}
      if (xMin1 < x2 && x2 < xMax1 && dy2 < 0) {dy2 = -1; distance = y1 - y2}
      if (xMin2 < x1 && x1 < xMax2 && dy2 > 0) {dy1 = 1; distance = y1 - y1}
      if (xMin2 < x1 && x1 < xMax2 && dy2 < 0) {dy1 = -1; distance = y2 - y2}

      if (yMin1 < y2 && y2 < yMax1 && dx2 > 0) {dx2 = 1; distance = x2 - x1}
      if (yMin1 < y2 && y2 < yMax1 && dx2 < 0) {dx2 = -1; distance = x1 - x2}
      if (yMin1 < y2 && y2 < yMax1 && dx2 > 0) {dx2 = 1; distance = x2 - x1}
      if (yMin1 < y2 && y2 < yMax1 && dx2 < 0) {dx2 = -1; distance = x1 - x2}

      if (type1) {dx2 = dx2/dec; dy2 = dy2/dec}
      if (type2) {dx1 = dx1/dec; dy1 = dy1/dec}

      Matter.Body.applyForce(object1, {x: x1, y: y1}, {x: dx1 / distance * multiplier * m2, y: dy1 / distance * multiplier * m2})
      Matter.Body.applyForce(object2, {x: x2, y: y2}, {x: dx2 / distance * multiplier * m1, y: dy2 / distance * multiplier * m1})
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
