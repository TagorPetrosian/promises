let job = require('./exercise1');
let exe2 = require('./exercise2');

async function test() {
  const randomId = Math.floor(Math.random() * 10) + 1; // random number from 1 to 10;
  const res = await job(randomId);

  console.log('res', res);
}

async function test2() {
  const randomId = Math.floor(Math.random() * 10) + 1; // random number from 1 to 10;
  const res = await exe2(randomId);

  console.log('res', res);
}

test2();
