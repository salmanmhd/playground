import express from 'express';
import dotenv from 'dotenv';
import { createTables } from './db';
import { Client } from 'pg';
dotenv.config();
const URI = process.env.URI;
const app = express();
app.use(express.json());

async () => {
  await createTables();
  console.log('database setup complete!');
};

const getClient = () => {
  return new Client({
    connectionString: URI,
  });
};

app.get('/', (req, res) => {
  res.send('up and running');
});

app.post('/user', async (req, res) => {
  const { username, email, password } = req.body;

  const client = getClient();
  await client.connect();
  try {
    const query = `
    INSERT INTO users(username, email, password )
    VALUES($1,$2,$3)
    RETURNING username, email, id
    `;

    const result = await client.query(query, [username, email, password]);
    if (result.rowCount && result.rowCount > 0) {
      res.status(200).json({
        msg: 'user created successfully',
        user: result.rows[0],
      });
    }
  } catch (error) {
    res.status(400).json({
      error,
    });
  } finally {
    await client.end();
  }
});

app.get('/user/:email', async (req, res) => {
  const { email } = req.params;
  const client = getClient();
  await client.connect();
  try {
    const query = `
        SELECT * FROM users WHERE email = $1
        `;
    const result = await client.query(query, [email]);
    if (result.rows.length > 0) {
      res.status(200).json({
        msg: 'user fethced successfully',
        user: result.rows[0],
      });
    }
  } catch (err) {
    console.log('something went wrong while getting users', err);
    res.status(400).json({
      msg: err,
    });
  } finally {
    await client.end();
  }
});

app.listen(3000, () => console.log('server running on port 3000'));
