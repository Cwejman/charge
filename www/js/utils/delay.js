define([], function () {

  return function (delay, callback) {
    setTimeout(function () {
      callback()
    }, delay)
  }

})
