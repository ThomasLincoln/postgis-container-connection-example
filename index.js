require('dotenv').config();
const { Client } = require('pg');
const express = require('express');
const bodyParser = require('body-parser');
const app = express();
const port = 3000;

app.use(bodyParser.json());

const createClient = () => {
  return new Client({
    user: process.env.PGUSER,
    host: process.env.PGHOST,
    database: process.env.PGDATABASE,
    password: process.env.PGPASSWORD,
    port: process.env.PGPORT,
  });
};

app.get('/', (req, res) => {
  const client = createClient();
  client.connect()
    .then(() => client.query('SELECT * FROM items'))
    .then(result => {
      res.json(result.rows);
      return client.end();
    })
    .catch(err => {
      console.error('Connection error', err.stack);
      res.status(500).send('Database connection error');
      client.end();
    });
});

app.post('/add', (req, res) => {
  const { name, description } = req.body;
  const client = createClient();
  client.connect()
    .then(() => client.query('INSERT INTO items (name, description) VALUES ($1, $2)', [name, description]))
    .then(() => {
      res.send('Item added');
      return client.end();
    })
    .catch(err => {
      console.error('Connection error', err.stack);
      res.status(500).send('Database connection error');
      client.end();
    });
});

app.listen(port, () => {
  console.log(`App running on http://localhost:${port}`);
});
