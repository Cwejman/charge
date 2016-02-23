define(function () {

  return function (len) {
    var text = ''
    var charset = 'abcdefghijklmnopqrstuvwxyzABCDEFGHIJKLMNOPQRSTUVWXYZ'

    for (var i = 0; i < len; i++)
      text += charset.charAt(Math.floor(Math.random() * charset.length))

    return text
  }

})
