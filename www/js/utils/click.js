define([], function () {

  return function (element, callback) {

    var touch = 'ontouchstart' in window

    if (touch) element.addEventListener("touchend", callback, false)
    else element.addEventListener("click", callback, false)

  }

})
