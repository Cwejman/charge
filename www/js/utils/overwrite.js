define(['utils/valuefy'], function (Valuefy) {

  function extend (target, source) {

    for (var prop in source) {
      if (typeof source[prop] === 'object') {
        target[prop] = extend(target[prop], source[prop]);
      } else {
        target[prop] = source[prop];
      }
    }

    return target;
  }

  return function (target, source) {

    if (arguments.length == 1) return target

    var input = JSON.parse(JSON.stringify(target))
    var output = extend(input, source)
    return output
  }

})
