const users = require('./users');
function promiseUsers(id) {
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

module.exports = promiseUsers;
