let job = require('./exercise1');
let exe2 = require('./exercise2');
let exe3 = require('./exe3');
const { LPromise } = require('./Promise/L3Promise');

// async function test() {
//   const randomId = Math.floor(Math.random() * 10) + 1; // random number from 1 to 10;
//   const res = await job(randomId);

//   console.log('res', res);
// }

// async function test2() {
//   const randomId = Math.floor(Math.random() * 10) + 1; // random number from 1 to 10;
//   const res = await exe2(randomId);

//   console.log('res', res);
// }

// test2();

const p1 = new LPromise((resolve, reject) => {
  setTimeout(() => resolve('resolved first one'), 1000);
});

// const p2 = new LPromise((resolve, reject) => {
//   reject('rejected!');
// });

// p1.then(
//   (res) => {
//     console.log(res);
//   },
//   (err) => {
//     console.log(err);
//   }
// );

// p2.then(
//   (res) => {
//     console.log(res);
//   },
//   (err) => {
//     console.log(err);
//   }
// );

p1.then((res) => {
  console.log(res);
  return new LPromise((resolve) => {
    setTimeout(() => resolve('resolved second one'), 1000);
  });
}).then((res) => {
  console.log(res);
});
