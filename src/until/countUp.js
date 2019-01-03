var lastTime = 0
if (!window.requestAnimationFrame) {
  window.requestAnimationFrame = function (callback, element) {
    let currTime = new Date().getTime()
    let timeToCall = Math.max(0, 16 - (currTime - lastTime))
    let id = window.setTimeout(function () {
      // callback(currTime + timeToCall)
    }, timeToCall)
    lastTime = currTime + timeToCall
    return id
  }
}
