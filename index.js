const express = require('express');
const { database } = require('./routes');
const { PORT, support } = require('./support');
const { Books } = require('./controllers');

const app = express();

app.use(express.json());

app.use((req, res, next) => {
  res.header('Access-Control-Allow-Origin', '*');
  res.header('Access-Control-Allow-Headers', 'Origin, X-Requested-With, Content-Type, Accept, Authorization');
  res.header('Access-Control-Allow-Methods', 'GET,PUT,POST,DELETE');
  next();
});

app.use('/api', database);

support.dbConnected(app, PORT, Books);
