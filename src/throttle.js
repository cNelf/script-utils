export function throttle(func, delay) {
  let timer = null;
  let savedArgs, savedThis;
  const wrapper = function(...args) {
    if (timer) {
      savedArgs = args;
      savedThis = this;
      return;
    };
    func.apply(this, args);
    timer = setTimeout(() => {
      if (savedArgs) {
        wrapper.apply(savedThis, savedArgs);
        savedArgs = null;
        savedThis = null;
      }
      timer = null;
    }, delay)
  }
  return wrapper;
}
