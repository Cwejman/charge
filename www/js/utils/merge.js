define([], function () {

  return function (array) {
    var output = []
    var input = array.slice(0)

    input.forEach(function (child) {
      output = output.concat(child)
    })

    return output
  }

})
