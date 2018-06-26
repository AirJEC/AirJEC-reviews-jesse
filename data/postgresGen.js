const faker = require('faker');
const fs = require('fs');
const path = require('path');

let batch = 0;

while (batch < 10) {
  const users = [];
  const listings = [];

  for (let i = 0; i < 1000000; i += 1) {
    users.push(`${faker.name.findName()},${faker.internet.avatar()}`);
    listings.push(faker.address.streetAddress());
  }
  if (batch === 0) {
    fs.appendFileSync(path.resolve(__dirname, './postgres/users.txt'), users.join('\n'));
    fs.appendFileSync(path.resolve(__dirname, './postgres/listings.txt'), listings.join('\n'));
  } else {
    fs.appendFileSync(path.resolve(__dirname, './postgres/users.txt'), `\n${users.join('\n')}`);
    fs.appendFileSync(path.resolve(__dirname, './postgres/listings.txt'), `\n${listings.join('\n')}`);
  }
  batch += 1;
  console.log('users/listings batch', batch);
}

let reviewsBatch = 0;

while (reviewsBatch < 100) {
  const reviews = [];

  for (let i = 0; i < 500000; i += 1) {
    reviews.push(`${faker.lorem.sentences()},${faker.random.number({ min: 1, max: 5 })},${faker.random.number({ min: 1, max: 5 })},${faker.random.number({ min: 1, max: 5 })},${faker.random.number({ min: 1, max: 5 })},${faker.random.number({ min: 1, max: 5 })},${faker.random.number({ min: 1, max: 5 })},${faker.random.number({ min: 1, max: 10000000 })},${faker.random.number({ min: 1, max: 10000000 })},${faker.date.past()}`);
  }

  if (reviewsBatch === 0) {
    fs.appendFileSync(path.resolve(__dirname, './postgres/reviews.txt'), reviews.join('\n'));
  } else {
    fs.appendFileSync(path.resolve(__dirname, './postgres/reviews.txt'), `\n${reviews.join('\n')}`);
  }
  reviewsBatch += 1;
  console.log('reviews batch', reviewsBatch);
}

console.log('done!');
