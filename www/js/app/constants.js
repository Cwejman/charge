
define([], function () {

  var colorsLight = ['#3498db', '#2ecc71', '#9b59b6', '#f05a5a']
  var colorsDark = ['#2980b9', '#27ae60', '#8e44ad', '#f24040']
  var backgroundColorLight = '#362f2f'
  var backgroundColorDark = '#2e2626'

  var height = window.innerHeight
  var width = window.innerWidth

  return {

    colorsLight: colorsLight,
    colorsDark: colorsDark,
    backgroundColorLight: backgroundColorLight,
    backgroundColorDark: backgroundColorDark,

    presetBall: {
      render: {
        fillStyle: colorsLight[1],
        strokeStyle: colorsDark[1],
        lineWidth: 1
      },
      frictionAir : 0.8,
      friction : 0.2,
      restitution : 0.2,
      inertia : 0.3,
      mass : 10
    },

    presetWall: {
      render: {
        fillStyle: backgroundColorLight,
        strokeStyle: backgroundColorLight,
        lineWidth: 0
      },
      isStatic: true,
      multiplier: 0.5
    },

    engineSettings: {
      render: {
        options: {
          width: width,
          height: height,
          wireframes: false,
          showDebug: true,
          background: backgroundColorDark,
          controller: Matter.RenderPixi
        }
      },
      world: {
        gravity: {
          y: 0,
          x: 0
        }
      }
    }

  }

})
