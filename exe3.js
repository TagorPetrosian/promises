const central = require('./central'),
  db1 = require('./db1'),
  db2 = require('./db2'),
  db3 = require('./db3'),
  vault = require('./vault'),
  mark = require('./mark');

const dbs = {
  db1,
  db2,
  db3,
};

// get data for { username , country}
// get data for db location from central
// get user data from user db with data provided from central

// get data for { firstname, lastname, email} from vault
// mart prfile read from mark

// return promise all when resolve

function getFirstPart(id) {
  return new Promise(function (resolve, reject) {
    return central(id)
      .catch(function (err) {
        Promise.reject('Error central');
      })
      .then(function (dbNum) {
        return dbs[dbNum](id).catch(function () {
          Promise.reject(`Error ${dbNum}`);
        });
      });
  });
}

function getSecondPart(id) {
  return vault(id).catch(function () {
    Promise.reject(`Error vault`);
  });
}

module.exports = function (id) {
  return new Promise(function (resolve, reject) {
    return Promise.all([getFirstPart(id), getSecondPart(id)])
      .then(function (data) {
        mark(id).then(function () {});

        return resolve({
          username: data[0].username,
          country: data[0].country,
          firstname: data[1].firstname,
          lastname: data[1].lastname,
          email: data[1].email,
        });
      })
      .catch(function (err) {
        console.log(err);
        return reject(err);
      });
  });
};
