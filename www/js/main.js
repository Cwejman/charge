
requirejs.config({

  baseUrl: 'js'

})

require(['app/controller', 'utils/click'], function (Ctrl, Click) {

  setTimeout(function() {
    if (window.StatusBar) {
      StatusBar.hide()
    }
  }, 300)


  document.getElementById('text').innerHTML = Ctrl.init()

  Click(
    document.getElementById('left'),
    function () {
      document.getElementById('text').innerHTML = Ctrl.swap(-1)
    }
  )

  Click(
    document.getElementById('right'),
    function () {
      document.getElementById('text').innerHTML = Ctrl.swap(1)
    }
  )

})
