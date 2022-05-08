class MyPromise {
  static PROMISE_STATE = {
    PENDING: 'pending',
    FULFILLED: 'fulfilled',
    REJECTED: 'rejected',
  };

  constructor(executor) {
    this._PromiseState = MyPromise.PROMISE_STATE.PENDING;
    this._PromiseResult = null;
    executor(this.resolve.bind(this), this.reject.bind(this));
  }

  resolve(value) {
    if (this._PromiseState === MyPromise.PROMISE_STATE.PENDING) {
      this._PromiseState = MyPromise.PROMISE_STATE.FULFILLED;
      this._PromiseResult = value;
    }
  }

  reject(reason) {
    if (this._PromiseState === MyPromise.PROMISE_STATE.PENDING) {
      this._PromiseState = MyPromise.PROMISE_STATE.REJECTED;
      this._PromiseResult = reason;
    }
  }

  then(onFulfilled, onRejected) {}
}

module.exports = MyPromise;
