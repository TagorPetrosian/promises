const users = require('./users');
function promiseUserLocation(id) {
  return new Promise(function (resolve, reject) {
    setTimeout(() => {
      const userData = users
        .filter((user) => user.id == id)
        .map(({ username, country }) => ({
          username,
          country,
        }));

      resolve(...userData);
    }, 50);
  });
}

function promiseUserData(id) {
  return new Promise(function (resolve, reject) {
    setTimeout(() => {
      const userData = users
        .filter((user) => user.id == id)
        .map(({ firstname, lastname, email }) => ({
          firstname,
          lastname,
          email,
        }));

      resolve(...userData);
    }, 50);
  });
}

module.exports = { promiseUserLocation, promiseUserData };
