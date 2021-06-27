const Router = require('express');

const postgresql = Router();

const { Books } = require('../controllers');
const { settingFields } = require('../support');

postgresql.get('/books', (req, res) => {
  Books.getRequest(req, res);
});

postgresql.post('/books', settingFields, (req, res) => {
  Books.create(req, res);
});

postgresql.put('/books/:id', settingFields, (req, res) => {
  Books.update(req, res);
});

const database = Router();

database.use('/postgresql', postgresql);

module.exports = database;
