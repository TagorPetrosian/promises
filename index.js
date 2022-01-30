let job = require('./exercise1');

async function test() {
  const randomId = Math.floor(Math.random() * 10) + 1; // random number from 1 to 10;
  const res = await job(randomId);

  console.log('res', res);
}

test();
