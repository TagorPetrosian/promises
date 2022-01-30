const db1 = require('./db1');
function job(data) {
  const random = Math.floor(Math.random() * 3) + 1;
  return new Promise(function (resolve, reject) {
    setTimeout(() => {
      if (isEven(random)) resolve(random);
      else reject(random);
      console.log('promise execution finished');
    }, 2000);
  });
}

function isEven(num) {
  return num % 2 == 0 ? true : false;
}
function resolved(data) {
  console.log('resolved Fn ' + data);
}

function rejected(data) {
  console.log('rejected Fn ' + data);
}

function test() {
  job().then(resolved).catch(rejected);
}

// test();

function testDb() {
  db1(1).then(function (data) {
    console.log(data);
  });
}

// testDb();
