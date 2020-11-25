export const compose = (f, g) => x => f(g(x));
export const curry = (f, ...arr) =>
  (...args) => ((...a) => (a.length === f.length ? f(...a) : curry(f, ...a)))(...arr, ...args);
export const converge = (f, [a, b]) => x => f(a(x), b(x));
export const map = curry((f, obj) => [].map.call(obj, f));
export const range = (s, e) => {
  let start = e === undefined ? 0 : s;
  const end = e === undefined ? s : e;
  const result = [];
  while (start < end) {
    result.push(start++);
  }
  return result;
};
// 函数节流, 在time时间内只触发一次
export function throttle(func, delay, immediate) {
  let timer = null;
  return function (...args) {
    timer && clearTimeout(timer);
    if (immediate) {
      !timer && func.apply(this, args);
      timer = setTimeout(() => {
        timer = null;
      }, delay);
    } else {
      timer = setTimeout(() => func.apply(this, args), delay);
    }
  };
}

// 函数节流, 一次执行完成之后才能进行下一次执行
export function singleThread(func) {
  let lock = false;
  return function (...args) {
    if (lock) {
      return;
    }
    lock = true;
    func(...args, () => {
      lock = false;
    });
  };
}
