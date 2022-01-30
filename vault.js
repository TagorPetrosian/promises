const { promiseUserData } = require('./utils');

module.exports = function (id) {
  return promiseUserData(id);
};
