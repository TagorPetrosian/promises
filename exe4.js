const central = require('./central'),
  db1 = require('./db1'),
  db2 = require('./db2'),
  db3 = require('./db3'),
  vault = require('./vault'),
  mark = require('./mark');

const dbs = { db1, db2, db3 };
// 1. username, country  => central , db
// 2. firstname, lastname, email => vault
function getUserLocation(id) {
  return central(id)
    .catch((err) => Promise.reject('Error Central'))
    .then((db) => dbs[db](id))
    .catch((db) => Promise.reject(`db${db} Error`));
}

function getVaultData(id) {
  return vault(id).catch((err) => Promise.reject('Error vault'));
}

module.exports = function (id) {
  return new Promise(function (resolve, reject) {
    Promise.all([getUserLocation(id), getVaultData(id)])
      .catch((err) => reject(err))
      .then((data) => {
        mark(id).catch((err) => {});
        return resolve({
          username: data[0].username,
          country: data[0].country,
          firstname: data[1].firstname,
          lastname: data[1].lastname,
          email: data[1].email,
        });
      });
  });
};
