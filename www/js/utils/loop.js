define(function () {

  return function (callback, delay, fps) {
    var lastTime = new Date()

    function repeat () {
      var nowTime = new Date()
      if (nowTime - lastTime > 1000 / fps) {
        callback()
        lastTime = nowTime
      }
      window.requestAnimationFrame(repeat)
    }

    setTimeout(function () {
      repeat()
    }, delay)
  }

})
