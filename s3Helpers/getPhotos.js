const aws = require('aws-sdk');
const axios = require('axios');
const cred = require('./config');

aws.config.update({
  accessKeyId: cred.accessKey,
  secretAccessKey: cred.secretKey,
  region: 'us-west-1',
});

const s3 = new aws.S3();

const getPhotos = (callback) => {
  const getParams = {
    Bucket: 'guestpics',
  };
  s3.listObjects(getParams, (err, data) => {
    if (err) {
      callback(err, null);
    } else {
      console.log(data);
      callback(null, data.Contents);
    }
  });
};

const inputPhotos = () => {
  axios.get('http://localhost:3001/photos')
    .then(() => console.log('added photos'))
    .catch(error => console.error(error));
};

module.exports = {
  getPhotos,
  inputPhotos,
};
