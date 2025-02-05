// USING POSTGRES : DIRECT QUERIES

import express from 'express';
import { createTables } from './db';
import { Client } from 'pg';
import dotenv from 'dotenv';
import cors from 'cors';
dotenv.config();
const KEY = process.env.KEY;
const app = express();
app.use(express.json());
app.use(cors());
(async () => {
  await createTables();
  console.log('Database setup complete!');
})();

const getClient = () => {
  return new Client({
    connectionString: KEY,
  });
};

app.get('/', async (req, res) => {
  res.send('running up and fine');
});

app.get('/user', async (req, res) => {
  const { email } = req.body;
  const client = getClient();
  await client.connect();
  try {
    const query = `
  SELECT * FROM users
  where email = $1
  `;
    const values = [email];
    const result = await client.query(query, values);
    if (result.rows.length > 0) {
      res.status(200).json({
        msg: 'user fetched successfully',
        user: result.rows[0],
      });
    }
  } catch (error) {
    res.status(400).json({
      msg: 'something went wrong',
      error,
    });
  } finally {
    await client.end();
  }
});

app.post('/user', async (req, res) => {
  const { username, email, password } = req.body;
  const client = getClient();

  await client.connect();
  try {
    const query = `
    INSERT INTO users(username, email, password)
    VALUES($1, $2, $3)
    RETURNING username, email, id
    `;
    const values = [username, email, password];
    const result = await client.query(query, values);
    if (result.rowCount && result.rowCount > 0) {
      res.status(200).json({
        msg: 'user added successfully',
        user: result.rows[0],
      });
    } else {
      console.log('something went wrong while creating users');
      console.log(result);
    }
  } catch (error) {
    res.status(400).json({
      msg: 'something went wrong while creating users',
      error,
    });
  } finally {
    await client.end();
  }
});

app.get('/todo/:id', async (req, res) => {
  const { id } = req.params;
  const client = getClient();

  await client.connect();
  try {
    const query = `
    SELECT * FROM todo
    WHERE id= $1
    `;
    const values = [id];
    const result = await client.query(query, values);
    if (result.rows.length > 0) {
      res.status(200).json({
        msg: 'todos fetched successfully',
        todos: result.rows[0],
      });
    }
  } catch (error) {
    res.status(400).json({
      msg: "can't get todo by id",
      error,
    });
  } finally {
    await client.end();
  }
});

app.get('/todo/:user_id', async (req, res) => {
  const { user_id } = req.params;

  const client = getClient();

  await client.connect();
  try {
    const query = `
    SELECT * FROM todos
    WHERE user_id = $1
    `;
    const result = await client.query(query, [user_id]);
    if (result.rows.length > 0) {
      res.status(200).json({
        msg: 'todos fetched successfully',
        todos: result.rows,
      });
    }
  } catch (error) {
    res.status(400).json({
      msg: "can't get todo by id",
      error,
    });
  } finally {
    await client.end();
  }
});

app.post('/todo', async (req, res) => {
  const { title, description, user_id } = req.body;
  const client = getClient();

  await client.connect();
  try {
    const query = `
        INSERT INTO todos(title, description, user_id)
        VALUES($1,$2,$3)
    `;
    const values = [title, description, user_id];
    const result = await client.query(query, values);
    if (result.rowCount && result.rowCount > 0) {
      res.status(200).json({
        msg: 'todo added successfully',
      });
    }
  } catch (error) {
    res.status(400).json({
      msg: "can't get todo by id",
      error,
    });
  } finally {
    await client.end();
  }
});

app.put('/todo/:id', async (req, res) => {
  const { id } = req.params;
  const client = getClient();

  await client.connect();
  try {
    const query = `
    UPDATE todos
    SET completed = NOT completed
    WHERE id=$1
    RETURNING *;
    `;
    const result = await client.query(query, [id]);
    if (result.rows.length > 0) {
      res.status(200).json({
        msg: 'todo updated',
        todos: result.rows[0],
      });
    } else {
      res.status(200).json({
        msg: `no todo found with id: ${id}`,
      });
    }
  } catch (error) {
    res.status(400).json({
      msg: "can't get todo by id",
      error,
    });
  } finally {
    await client.end();
  }
});

app.delete('/todo/:id', async (req, res) => {
  const { id } = req.params;
  const client = getClient();
  await client.connect();
  try {
    const query = `
    DELETE FROM todos
    WHERE id = $1
    `;
    const result = await client.query(query, [id]);
    if (result.rowCount && result.rowCount > 0) {
      res.status(200).json({
        msg: 'Todos deleted successfully',
      });
    } else {
      res.status(400).json({
        msg: `no todos found with id: ${id}`,
      });
      console.log(`no todos found with id: ${id}`);
    }
  } catch (error) {
    res.status(400).json({
      msg: "can't get todo by id",
      error,
    });
  } finally {
    await client.end();
  }
});

app.listen(3000, () => {
  console.log(`server running on 3000`);
});
