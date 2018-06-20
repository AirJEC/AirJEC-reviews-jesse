const mysql = require('mysql');
const config = require('./mysqlConfig');

const connection = mysql.createConnection(config);

connection.connect((err) => {
  if (err) {
    console.log('failed to make connection to airFeC_reviews', err);
  } else {
    console.log('connected to mysql database');
  }
});

const getData = (id, callback) => {
  const queryStr = `SELECT reviews.*, properties.host_name, properties.host_photo, properties.host_text FROM reviews, properties WHERE reviews.host_id = ${id} AND properties.id = ${id}`;
  connection.query(queryStr, (err, data) => {
    if (err) {
      callback(err, null);
    } else {
      callback(null, data);
    }
  });
};

const addPhotos = (photos) => {
  for (let j = 0; j < 13; j += 1) {
    for (let i = 1; i < 490; i += 1) {
      // update the host photos, only 100 hosts
      if (i <= 100) {
        const hostPhotosQuery = `UPDATE properties SET host_photo='https://s3-us-west-1.amazonaws.com/guestpics/${photos[i].Key}' WHERE id=${i}`;
        connection.query(hostPhotosQuery, (err) => {
          if (err) {
            console.log('failed to update host photos');
          } else {
            console.log('succefully updated host photos');
          }
        });      
      }
      // update the guest photos
      const guestPhotosQuery = `UPDATE reviews SET guest_photo='https://s3-us-west-1.amazonaws.com/guestpics/${photos[i].Key}' WHERE id=${i + (400 * j)}`;
      connection.query(guestPhotosQuery, (err) => {
        if (err) {
          console.log('failed to update guest photos', err);
        } else {
          console.log('successfully updated guest photos');
        }
      });
    }
  }
};

module.exports = {
  getData,
  addPhotos,
};

