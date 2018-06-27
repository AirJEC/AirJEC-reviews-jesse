const gen = require('./dataGen');
const cassandra = require('cassandra-driver');

let listingId = 1;

const makeQueries = () => {
  const queries = [];

  for (let i = 0; i < 10; i += 1) {
    const data = gen();
    const { address, reviews } = data;

    const reducedReviews = reviews.slice(0, Math.ceil(Math.random() * 10));

    queries.push({
      query: 'INSERT INTO listings (id, address, reviews) VALUES (?, ?, ?)',
      params: [
        listingId,
        address,
        reducedReviews,
      ],
    });

    listingId += 1;
  }

  return queries;
};

const client = new cassandra.Client({ contactPoints: ['127.0.0.1'], keyspace: 'airjec_reviews' });
client.connect((err) => {
  if (err) {
    throw err;
  } else {
    console.log('Connected to Cassandra database!');
  }
});

const addToDb = (batch) => {
  if (batch === 1000001) {
    return;
  }

  const queries = makeQueries();

  client.batch(queries, { prepare: true })
    .then(() => {
      console.log('batch', batch);
      addToDb(batch + 1);
    })
    .catch(err => console.log('Error:', err));
};

addToDb(1);

console.log('Done!');
