const { Pool } = require('pg');

const host = process.env.HOST || '127.0.0.1';
const database = process.env.DATABASE || 'airfec_reviews';

const client = new Pool({
  host,
  database,
});

client.connect((err) => {
  if (err) {
    console.log('Failed to connect to airfec_reviews database.');
  } else {
    console.log('Connected to airfec_reviews PostgreSQL database.');
  }
});

const getQuery = `
  SELECT reviews.id, reviews.review_text, reviews.accuracy_rating, reviews.communication_rating, reviews.cleanliness_rating, reviews.location_rating, reviews.checkin_rating, reviews.value_rating, reviews.review_date, users.guest_name, users.guest_photo, listings.host_name, listings.host_photo, listings.host_text 
  FROM reviews 
  INNER JOIN users ON users.id = reviews.user_id
  INNER JOIN listings ON reviews.listing_id = listings.id
  WHERE listings.id = $1
`;

const getData = (id, callback) => {
  client.query(getQuery, [id], (err, res) => {
    if (err) {
      callback(err);
    } else {
      callback(null, res.rows);
    }
  });
};

const postData = (params, callback) => {
  client.query(`INSERT INTO reviews (review_text, accuracy_rating, communication_rating, cleanliness_rating, location_rating, checkin_rating, value_rating, user_id, listing_id, review_date) VALUES ('${params.review_text}', ${params.accuracy_rating}, ${params.communication_rating}, ${params.cleanliness_rating}, ${params.location_rating}, ${params.checkin_rating}, ${params.value_rating}, ${params.user_id}, ${params.listing_id}, '${params.review_date}');`, (err, res) => {
    if (err) {
      callback(err);
    } else {
      callback(null, res);
    }
  });
};

const putData = (params, callback) => {
  client.query(`UPDATE reviews SET ${params.updates} WHERE id = ${params.id}`, (err, res) => {
    if (err) {
      callback(err);
    } else {
      callback(null, res);
    }
  });
};

const deleteData = (id, callback) => {
  client.query(`DELETE FROM reviews WHERE id = ${id}`, (err, res) => {
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
