define(['./add', './constants'],
function (Add, Constants) {

  var width = window.innerWidth
  var height = window.innerHeight
  var build = {}

  var wallSize = 20
  var sizeX = width / 2 - wallSize
  var sizeY = height / 3 - wallSize

  var outerWalls = [
    [width / 2, wallSize / 2, width, wallSize],
    [width / 2, height - wallSize / 2, width, wallSize],
    [wallSize / 2, height / 2, wallSize, height],
    [width - wallSize / 2, height / 2, wallSize, height],
  ]

  var whisk = [
    [width / 2, wallSize * 0.8, wallSize * 3, wallSize * 0.25],
  ]

  var thrusters = [
    [wallSize * 0.8, wallSize + sizeY / 2, wallSize * 0.25, sizeY],
    [width - (wallSize + sizeX / 2), wallSize * 0.8, sizeX, wallSize * 0.25],
    [wallSize + sizeX / 2, height - wallSize * 0.8, sizeX, wallSize * 0.25],
    [width - wallSize * 0.8, height - (wallSize + sizeY / 2), wallSize * 0.25, sizeY]
  ]

  return [

    [
      'THE MOLECULE',
      [
        Add.rectangles(outerWalls, Constants.presetWall),
        Add.balls(30, 6, 90, Constants.presetBall)
      ]
    ],

    [
      'THE CAROUSEL',
      [
        Add.rectangles(outerWalls, Constants.presetWall, {
          multiplier: 0.03
        }),
        Add.rectangles(thrusters, Constants.presetWall, {
          multiplier: 0.5,
          render: {
            fillStyle: Constants.colorsLight[1],
            strokeStyle: Constants.colorsLight[1]
          }
        }),
        Add.balls(10, 7, 70, Constants.presetBall, {
          frictionAir: 0.3
        })
      ]
    ],

    [
      'THE WHISK', [
        Add.rectangles(outerWalls, Constants.presetWall, {
          multiplier: 0.1
        }),
        Add.rectangles(whisk, Constants.presetWall, {
          multiplier: 0.5,
          render: {
            fillStyle: Constants.colorsLight[1],
            strokeStyle: Constants.colorsLight[1]
          }
        }),
        Add.balls(30, 5, 50, Constants.presetBall, {
          frictionAir: 0.2,
          multiplier: 0.2
        })
      ]
    ],

    [
      'NEW', [
        Add.rectangles([outerWalls[0], outerWalls[1]], Constants.presetWall, {
          multiplier: 0.4
        }),
        Add.rectangles([outerWalls[2], outerWalls[3]], Constants.presetWall, {
          multiplier: 0.1
        }),
        Add.balls(1, 15, 1, Constants.presetBall, {
          render: {
            fillStyle: Constants.backgroundColorLight,
            strokeStyle: Constants.backgroundColorLight
          },
          isStatic: true,
          multiplier: 4
        }),
        Add.balls(40, 3, 40, Constants.presetBall, {
          frictionAir: 0.5,
          multiplier: 0.5
        })
      ]
    ]

  ]

})
