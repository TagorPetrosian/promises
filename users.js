// Load and instantiate Chance
var chance = require('chance').Chance();

// Use Chance here.

function populateUsers() {
  let users = [];

  for (let i = 0; i < 10; i++) {
    const firstname = chance.first();
    const lastname = chance.last();
    const id = i + 1;
    const username = `${firstname}${lastname}${id}`;
    users.push({
      id,
      username,
      firstname,
      lastname,
      country: chance.country(),
      email: chance.email(),
    });
  }

  return users;
}

const users = populateUsers();
// console.log('freshly generated users:', users);

module.exports = users;
