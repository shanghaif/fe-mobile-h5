export default (animate) => (window.requestAnimationFrame
  || window.webkitRequestAnimationFrame
  || window.mozRequestAnimationFrame
  || function (fn) { setTimeout(fn, 1000 / 60); })(animate);
