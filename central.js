module.exports = function (id) {
  const index = Math.floor(Math.random() * 3) + 1;
  return new Promise(function (resolve, reject) {
    setTimeout(() => {
      if (id !== 2) {
        resolve(`db${index}`);
      } else {
        reject('Error from central');
      }
    }, 100);
  });
};
