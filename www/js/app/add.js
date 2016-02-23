define(['utils/overwrite'], function (Overwrite) {

  var width = window.innerWidth
  var height = window.innerHeight

  return {

    balls: function (quantity, size, spawn, preset, settings) {
      var bodies = []
      var r = spawn || 1
      for (var round = 1; round <= quantity; round++) {
        var t = 6.28319 * round / quantity
        var x = r * Math.cos(t) + width / 2
        var y = r * Math.sin(t) + height / 2
        bodies.push( Matter.Bodies.circle(x, y, size, Overwrite(preset, settings)) )
      }
      return bodies
    },

    rectangles: function (group, preset, settings) {
      var bodies = []
      group.forEach(function (arg) {
        bodies.push( Matter.Bodies.rectangle(arg[0], arg[1], arg[2], arg[3], Overwrite(preset, settings)) )
      })
      return bodies
    }

  }

})
