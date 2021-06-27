const pg = require('pg');

require('dotenv').config();

const config = {
  host: 'localhost',
  user: 'postgres',
  password: process.env.PASSWORD,
  database: process.env.DATABASE,
  port: 5432,
}


class Books {
  constructor() {
    this.client = new pg.Client(config);
  }

  connect = () => {
    try {
      this.client.connect().catch((err) => {
        console.log(err);
      });
    }
    catch (e) {
      console.log(e);
    }
  };

  async getRequest(req, res) {
    try {
      const queryAll = `SELECT * FROM books`;
      const result = await this.client.query(queryAll);
      if (req.query.sort || req.query.sort !== 'id') {
        result.rows.sort((a, b) => a[req.query.sort] > b[req.query.sort] ? 1 : -1);
      }
      res.send(result.rows).status(200);
    } catch (err) {
      console.log(err);
    }
  }

  async create(req, res) {
    try {
      const newField = req.body;
      const queryAll = `SELECT * FROM books`;
      const queryCreate = `INSERT INTO books (date, author, description, image, title) VALUES ('${newField.date}', '${newField.author}', '${newField.description}', '${newField.image}', '${newField.title}') RETURNING *`;
      await this.client.query(queryCreate);
      const result = await this.client.query(queryAll);
      res.send(result.rows).status(200);
      console.log(result.rows);
    } catch (err) {
      console.log(err);
    }
  }

  async update(req, res) {
    try {
      const newField = req.body;
      const id = req.params.id;
      const key = Object.keys(newField)[0];
      const queryUpdate = `UPDATE books SET "${key}" = '${newField[key]}' WHERE id = ${id}`;
      await this.client.query(queryUpdate);
      res.send(queryUpdate.fields).status(200);
    } catch (err) {
      console.log(err);
    }
  }
}

module.exports = new Books();
