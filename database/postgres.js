const { Client } = require('pg');

const client = new Client({
  host: '127.0.0.1',
  database: 'airfec_reviews',
});

client.connect((err) => {
  if (err) {
    console.log('Failed to connect to airfec_reviews database.');
  } else {
    console.log('Connected to airfec_reviews PostgreSQL database.');
  }
});

const getData = (id, callback) => {
  client.query(`
  SELECT reviews.id, reviews.review_text, reviews.accuracy_rating, reviews.communication_rating, reviews.cleanliness_rating, reviews.location_rating, reviews.checkin_rating, reviews.value_rating, reviews.review_date, users.guest_name, users.guest_photo, listings.host_name, listings.host_photo, listings.host_text 
  FROM reviews 
  INNER JOIN users ON users.id = reviews.user_id AND reviews.listing_id = ${id} 
  INNER JOIN listings ON reviews.listing_id = listings.id`, (err, res) => {
    if (err) {
      callback(err);
    } else {
      callback(null, res.rows);
    }
  });
};

const postData = (params, callback) => {
  client.query(`QUERY`, `PARAMS`, (err, res) => {
    if (err) {
      callback(err);
    } else {
      callback(null, res);
    }
  });
};

const putData = (params, callback) => {
  client.query(`QUERY`, `PARAMS`, (err, res) => {
    if (err) {
      callback(err);
    } else {
      callback(null, res);
    }
  });
};

const deleteData = (params, callback) => {
  client.query(`QUERY`, `PARAMS`, (err, res) => {
    if (err) {
      callback(err);
    } else {
      callback(null, res);
    }
  });
};

module.exports = {
  getData,
  postData,
  putData,
  deleteData,
};
