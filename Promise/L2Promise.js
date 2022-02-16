class LPromise {
  onFulfilledCallbacks = [];
  onRejectedCallbacks = [];
  status = 'pending';
  constructor(handler) {
    const resolve = (value) => {
      if (this.status === 'pending') {
        this.status = 'fulfilled';
        this.value = value;
        this.onFulfilledCallbacks.forEach((fn) => fn(this.value));
      }
    };

    const reject = (value) => {
      if (this.status === 'pending') {
        this.status = 'rejected';
        this.value = value;
        this.onFulfilledCallbacks.forEach((fn) => fn(this.value));
      }
    };

    try {
      handler(resolve, reject);
    } catch (err) {
      reject(err);
    }
  }

  then(onFulfilled, onRejected) {
    if (this.status === 'pending') {
      this.onFulfilledCallbacks.push(onFulfilled);
      this.onRejectedCallbacks.push(onRejected);
    } else if (this.status === 'fulfilled') {
      onFulfilled(this.value);
    } else if (this.status === 'rejected') {
      onRejected(this.value);
    }
  }
}

module.exports = {
  LPromise,
};
