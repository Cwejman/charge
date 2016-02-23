define(['./repel', './worlds', './constants', 'utils/loop', 'utils/merge'],
function (Repel, Worlds, Constants, Loop, Merge) {

  var engine = Matter.Engine.create(document.getElementById('canvas'), Constants.engineSettings)
  var currentWorld = 3

  Matter.Engine.run(engine)

  return {

    _render: function (nr) {

      var title = Worlds[nr][0]
      var bodies = Merge( Worlds[nr][1] )

      Matter.World.clear(engine.world, false)
      Matter.World.add(engine.world, bodies)
      Matter.World.add(engine.world, Matter.MouseConstraint.create(engine))

      Loop(function () {
        Repel(bodies)
      }, 100, 30)

      return title

    },

    init: function () {

      return this._render(currentWorld)

    },

    swap: function (nr) {

      var length = Worlds.length

      if (currentWorld + nr >= length) currentWorld = 0
      else if (currentWorld + nr < 0) currentWorld = length - 1
      else currentWorld += nr

      return this._render(currentWorld)

    }

  }

})
