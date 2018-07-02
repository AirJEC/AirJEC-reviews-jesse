require('newrelic');
const express = require('express');
const path = require('path');
const cluster = require('cluster');
const numCPUs = require('os').cpus().length;
const bodyParser = require('body-parser');
const db = require('../database/postgres');
const redis = require('redis');

const app = express();
const port = process.env.PORT || 3001;
const client = redis.createClient();


if (cluster.isMaster) {
  console.log(`Master ${process.pid} is running`);

  for (let i = 0; i < numCPUs; i += 1) {
    cluster.fork();
  }

  cluster.on('exit', (worker) => {
    console.log(`worker ${worker.process.pid} died`);
  });
} else {
  client.on('error', err => console.log('Error:', err));

  const cache = (req, res, next) => {
    const { id } = req.params;

    client.get(id, (err, data) => {
      if (err) throw err;

      if (data !== null) {
        res.send(data);
      } else {
        next();
      }
    });
  };

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

  app.get('/reviews/:id', cache, (req, res) => {
    db.getData(req.params.id, (err, data) => {
      if (err) {
        res.status(400).send(err);
      } else {
        client.setex(req.params.id, 60, JSON.stringify(data));
        res.send(data);
      }
    });
  });

  app.post('/reviews/:id', (req, res) => {
    db.postData(req.body, (err, data) => {
      if (err) {
        res.status(400).send(err);
      } else {
        res.status(201).send(data);
      }
    });
  });

  app.put('/reviews/:id', (req, res) => {
    db.putData(req.body, (err, data) => {
      if (err) {
        res.status(400).send(err);
      } else {
        res.status(204).send(data);
      }
    });
  });

  app.delete('/reviews/:id', (req, res) => {
    db.deleteData(req.body.id, (err, data) => {
      if (err) {
        res.status(400).send(err);
      } else {
        res.status(204).send(data);
      }
    });
  });

  module.exports = app.listen(port, () => {
    console.log('server listening on port ', port);
  });
}

