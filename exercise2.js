const central = require('./central'),
  db1 = require('./db1'),
  db2 = require('./db2'),
  db3 = require('./db3'),
  vault = require('./vault'),
  mark = require('./mark');

function getDbData(id) {
  function dbHandler(data) {
    return data;
  }

  function centralError() {
    return 'Error central';
  }

  return central(id).then(dbHandler).catch(centralError);
}

function getLocationData(db, id) {
  const dbs = { db1, db2, db3 };

  function extractData(data) {
    return data;
  }

  function logError(db) {
    return `Error ${db}`;
  }

  return dbs[db](id).then(extractData).catch(logError);
}

function getVaultData(id) {
  function extractData(data) {
    return data;
  }

  function rejected() {
    return Promise.reject('Error vault');
  }

  return vault(id).then().catch();
}

function executeMark(id) {
  function logError(err) {
    return err;
  }
  return mark(id).catch(logError);
}

module.exports = function (id) {
  return new Promise(function (resolve, reject) {
    return Promise.all([getDbData(id).then((db) => getLocationData(db, id)), getVaultData(id)])
      .then(function (data) {
        executeMark(id);
        return resolve({
          id: id,
          username: data[0].username,
          country: data[0].country,
          firstname: data[1].firstname,
          lastname: data[1].lastname,
          email: data[1].email,
        });
      })
      .catch(function (error) {
        reject(error);
      });
  });
};
