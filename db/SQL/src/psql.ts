import { Client } from 'pg';
import dotenv from 'dotenv';
import { createEsmHooks } from 'ts-node/dist/esm';

dotenv.config();

const KEY = process.env.URI;
console.log(KEY);

function getClient() {
  return new Client({
    connectionString: KEY,
  });
}

(async function createTables() {
  const client = getClient();
  await client.connect();

  try {
    const createUsersQuery = `
      CREATE TABLE IF NOT EXISTS users (
        id SERIAL PRIMARY KEY,
        username VARCHAR(255) UNIQUE NOT NULL,
        email VARCHAR(255) UNIQUE NOT NULL,
        password VARCHAR(255) NOT NULL,
        created_at TIMESTAMP WITH TIME ZONE DEFAULT CURRENT_TIMESTAMP
      )
      `;

    await client.query(createUsersQuery);

    const createTodosQuery = `
      CREATE TABLE IF NOT EXISTS todos (
        id SERIAL PRIMARY KEY,
        user_id INTEGER NOT NULL,
        title VARCHAR(255) UNIQUE NOT NULL,
        completed BOOLEAN DEFAULT FALSE,
        created_at TIMESTAMP WITH TIME ZONE DEFAULT CURRENT_TIMESTAMP,
        FOREIGN KEY (user_id) REFERENCES users(id) ON DELETE CASCADE
      )
      `;
    await client.query(createTodosQuery);
    console.log('Tables created successfully');
  } catch (error) {
    console.log('something went wrong while creating  table: ', error);
  } finally {
    await client.end();
  }
})();

async function createUser(username: string, email: string, password: string) {
  const client = getClient();
  await client.connect();
  try {
    const query = `
    INSERT INTO users(username, email, password)
    VALUES($1, $2, $3)
    RETURNING *
    `;
    const values = [username, email, password];
    const result = await client.query(query, values);
    if (result.rows && result.rows.length > 0) {
      return {
        msg: 'user created successfully',
        user: result.rows[0],
      };
    }
  } catch (error) {
    console.log('something went wrong while creating user: ', error);
  } finally {
    client.end();
  }
}

async function getAllUsers() {
  const client = getClient();
  await client.connect();
  try {
    const query = `
      SELECT * FROM users
      `;
    const result = await client.query(query);
    if (result.rows && result.rows.length > 0) {
      return {
        msg: 'users fetched successfully',
        users: result.rows,
      };
    }
  } catch (error) {
  } finally {
    client.end();
  }
}

async function getUser(username: string) {
  const client = getClient();
  await client.connect();
  try {
    const query = `
    SELECT * FROM users
    WHERE username=$1
    `;
    const values = [username];
    const result = await client.query(query, values);
    if (result.rows && result.rows.length > 0) {
      return {
        msg: 'user fetched successfully',
        user: result.rows[0],
      };
    }
  } catch (error) {
  } finally {
    client.end();
  }
}

async function deleteUser(username: string) {
  const client = getClient();
  await client.connect();
  try {
    const query = `
    DELETE FROM users
    WHERE username=$1
    `;
    const values = [username];
    const result = await client.query(query, values);
    if (result.rows && result.rows.length > 0) {
      return {
        msg: 'user deleted successfully',
        user: result.rows[0],
      };
    }
  } catch (error) {
  } finally {
    client.end();
  }
}

async function getTodos(user_id: string) {
  const client = getClient();
  await client.connect();
  try {
    const query = `
    SELECT * FROM todos
    WHERE user_id=$1
    `;
    const values = [user_id];
    const result = await client.query(query, values);
    if (result.rows && result.rows.length > 0) {
      return {
        msg: 'todos fethced successfully',
        todos: result?.rows[0],
      };
    }
  } catch (error) {
  } finally {
    client.end();
  }
}

async function createTodos(user_id: string, title: string) {
  const client = getClient();
  await client.connect();
  try {
    const query = `
    INSERT INTO todos(user_id, title)
    VALUES($1, $2)
    RETURNING *
    `;

    const result = await client.query(query, [user_id, title]);
    if (result.rows.length > 0) {
      return {
        msg: 'todos created successfully',
        todos: result.rows[0],
      };
    }
  } catch (error) {
    console.log('something went wrong while creating user todos', error);
  } finally {
    client.end();
  }
}

// export { creatUser, getUser, getTodos, createTodos, deleteUser };

// ----------

// creatUser('sam', 'a@gm.com', 'password');
(async function getThings() {
  await createTodos('3', 'stay happy');
  await createTodos('3', 'stay calm and think postive');
  await createTodos('3', ' you can do buddy');
})();
