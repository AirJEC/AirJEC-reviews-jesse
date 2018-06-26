DROP TABLE IF EXISTS reviews;
DROP TABLE IF EXISTS users;
DROP TABLE IF EXISTS listings;

CREATE TABLE users (
  id SERIAL PRIMARY KEY,
  username VARCHAR(50),
  user_img VARCHAR(150)
);

CREATE TABLE listings (
  id SERIAL PRIMARY KEY,
  address varchar(100)
);

CREATE TABLE reviews (
  id SERIAL PRIMARY KEY,
  body VARCHAR(600),
  accuracy_rating INTEGER,
  communication_rating INTEGER,
  cleanliness_rating INTEGER,
  location_rating INTEGER,
  checkin_rating INTEGER,
  value_rating INTEGER,
  user_id INTEGER REFERENCES users(id),
  listing_id INTEGER REFERENCES listings(id),
  date_submitted VARCHAR(40)
);

COPY users (username, user_img)
  FROM '/Users/jzchua/Documents/HR/SDC/AirJEC-reviews-jesse/data/postgres/users.txt' (DELIMITER(','));

COPY listings (address)
  FROM '/Users/jzchua/Documents/HR/SDC/AirJEC-reviews-jesse/data/postgres/listings.txt';

COPY reviews (body, accuracy_rating, communication_rating, cleanliness_rating, location_rating, checkin_rating, value_rating, user_id, listing_id, date_submitted)
  FROM '/Users/jzchua/Documents/HR/SDC/AirJEC-reviews-jesse/data/postgres/reviews.txt' (DELIMITER(','));
