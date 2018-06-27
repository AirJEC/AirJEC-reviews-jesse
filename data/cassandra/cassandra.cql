DROP KEYSPACE IF EXISTS airjec_reviews;

CREATE KEYSPACE airjec_reviews 
  WITH REPLICATION = { 'class' : 'NetworkTopologyStrategy', 'datacenter1': '1' };

USE airjec_reviews;

CREATE TYPE reviews (
  user varchar,
  user_img varchar,
  body varchar,
  accuracy_rating int,
  communication_rating int,
  cleanliness_rating int,
  location_rating int,
  checkin_rating int,
  value_rating int,
  date_submitted date,
);

CREATE TABLE listings (
  id int primary key,
  address varchar,
  reviews set<frozen <reviews>>,
);
