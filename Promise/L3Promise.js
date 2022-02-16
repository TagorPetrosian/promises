// adding promise chaining
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

  // Now i should handle the returned value from previous promise
  then(onFulfilled, onRejected) {
    return new LPromise((resolve, reject) => {
      if (this.status === 'pending') {
        this.onFulfilledCallbacks.push(() => {
          try {
            const fulfilledFromLastPromise = onFulfilled(this.value);
            resolve(fulfilledFromLastPromise);
          } catch (err) {
            reject(err);
          }
        });

        this.onRejectedCallbacks.push(() => {
          try {
            const rejectedFromLastPromise = onRejected(this.value);
            reject(rejectedFromLastPromise);
          } catch (err) {
            reject(err);
          }
        });
      } else if (this.status === 'fulfilled') {
        try {
          const fulfilledFromLastPromise = onFulfilled(this.value);
          resolve(fulfilledFromLastPromise);
        } catch (err) {
          reject(err);
        }
      } else if (this.status === 'rejected') {
        try {
          const rejectedFromLastPromise = onRejected(this.value);
          reject(rejectedFromLastPromise);
        } catch (err) {
          reject(err);
        }
      }
    });
  }
}

module.exports = {
  LPromise,
};
