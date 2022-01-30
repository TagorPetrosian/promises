const { promiseUserLocation } = require('./utils');

module.exports = function (id) {
  return promiseUserLocation(id);
};
