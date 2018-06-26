const express = require('express');
const path = require('path');
const bodyParser = require('body-parser');
const db = require('../database/index');
const helper = require('../s3Helpers/getPhotos');

const app = express();
const port = process.env.PORT || 3001;

app.use(bodyParser.json());
app.use(bodyParser.urlencoded({ extended: true }));

app.use((req, res, next) => {
  res.setHeader('Access-Control-Allow-Origin', '*');
  res.setHeader('Access-Control-Allow-Methods', 'GET, POST, OPTIONS, PUT, PATCH, DELETE');
  res.setHeader('Access-Control-Allow-Headers', 'X-Requested-With,application/xml');
  res.setHeader('Access-Control-Allow-Credentials', true);
  next();
});

app.use('/rooms/:id', express.static(path.join(__dirname, '../public/dist/')));

app.get('/reviews/:id', (req, res) => {
  db.getData(req.params.id, (err, data) => {
    if (err) {
      res.status(400).send(err);
    } else {
      res.status(200).send(data);
    }
  });
});

app.post('/reviews/:id', (req, res) => {
  db.postData(req.params.id, (err, data) => {
    if (err) {
      res.status(400).send(err);
    } else {
      res.status(201).send(data);
    }
  });
});

app.put('/reviews/:id', (req, res) => {
  db.putData(req.params.id, (err, data) => {
    if (err) {
      res.status(400).send(err);
    } else {
      res.status(204).send(data);
    }
  });
});

app.delete('/reviews/:id', (req, res) => {
  db.deleteData(req.params.id, (err, data) => {
    if (err) {
      res.status(400).send(err);
    } else {
      res.status(204).send(data);
    }
  });
});

app.get('/photos', (req, res) => {
  helper.getPhotos((err, photos) => {
    if (err) {
      res.status(400).send(err);
    } else {
      db.addPhotos(photos);
      res.status(200).send('sucessfully added photos');
    }
  });
});

// uncomment this to input photos into your mysql database, only needs to be run once
// helper.inputPhotos();

app.listen(port, () => {
  console.log('server listening on port ', port);
});
