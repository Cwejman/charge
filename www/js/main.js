
requirejs.config({

  baseUrl: 'js'

})

require(['app/controller', 'utils/click'], function (Ctrl, Click) {
  
  var displayText = document.getElementById('text')
  var leftBtn = document.getElementById('left')
  var rigthBtn = document.getElementById('right')
  
  setTimeout(function() {
    if (window.StatusBar) {
      StatusBar.hide()
    }
  }, 300)

  displayText.innerHTML = Ctrl.init()

  Click(leftBtn, function () {
    displayText.innerHTML = Ctrl.swap(-1)
  })

  Click(rigthBtn, function () {
    displayText.innerHTML = Ctrl.swap(1)
  })

})
