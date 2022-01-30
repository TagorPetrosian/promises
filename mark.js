module.exports = function (id) {
  return new Promise(function (resolve, reject) {
    if (id !== 2) resolve();
    else reject('Mark Error');
  });
};
