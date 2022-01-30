const promiseUsers = require('./utils');

module.exports = function (id) {
  return promiseUsers(id);
};
