import { Client } from 'pg';
import dotenv from 'dotenv';
dotenv.config();
const KEY = process.env.KEY;

const client = new Client({
  connectionString: KEY,
});
async function insertData(username: string, email: string, password: string) {
  await client.connect();
  try {
    const insertQuesry = `
    INSERT INTO users(username, email, password) 
    VALUES($1, $2, $3);
    `;
    const values = [username, email, password];
    const res = await client.query(insertQuesry, values);
    console.log(`Insertion succes: ${JSON.stringify(res)}`);
  } catch (error) {
    console.log(error);
  }
}

async function getUser(username: string) {
  await client.connect();

  const query = `
    SELECT * FROM users WHERE username= $1
  `;
  const values = [username];
  const res = await client.query(query, values);

  if (res.rows.length > 0) {
    console.log('User found', res.rows[0]);
    return res.rows[0];
  } else {
    console.log('No user found with the username: ', username);
  }

  try {
  } catch (error) {
    console.log('error: ', error);
  } finally {
    await client.end();
  }
}

async function createUserTable() {
  await client.connect();
  try {
    const result = await client.query(`
        CREATE TABLE admin(
            id SERIAL PRIMARY KEY,
            username VARCHAR(50) UNIQUE NOT NULL,
            email VARCHAR(255) UNIQUE NOT NULL,
            password VARCHAR(255) NOT NULL,
            created_at TIMESTAMP WITH TIME ZONE DEFAULT CURRENT_TIMESTAMP
        )
        `);
    console.log(result);
  } catch (error) {
    console.log(`error: ${error}`);
  }
}

async function updateUser(email: string, username: string) {
  await client.connect();
  try {
    const query = `
    UPDATE users
    SET username = $2
    WHERE email = $1
    `;
    const values = [email, username];
    const res = await client.query(query, values);

    if (res.rowCount === 0) {
      console.log('no user found with the email: ', email);
      console.log(res);
    } else {
      console.log('user updated successfully');
      console.log(res);
    }
  } catch (error) {
    console.log('something went wrong while updating user: ', error);
  } finally {
    await client.end();
  }
}

async function createTodosTable() {
  await client.connect();
  try {
    const res = await client.query(`
        CREATE TABLE todos(
            id SERIAL PRIMARY KEY,
            user_id INTEGER NOT NULL,
            title VARCHAR(255) NOT NULL,
            description VARCHAR(255),
            completed BOOLEAN DEFAULT FALSE,
            FOREIGN KEY (user_id) REFERENCES users (id) ON DELETE CASCADE
        )
        `);
    console.log('todos table created successfully: ', res);
  } catch (error) {
    console.log('something went wrong while creating todos table', error);
  } finally {
    await client.end();
  }
}

async function addTodos(id: number, title: string, description: string) {
  await client.connect();

  try {
    const query = `
        INSERT INTO todos(user_id, title, description)
        VALUES($1, $2, $3)
    `;
    const values = [id, title, description];
    const res = await client.query(query, values);
    console.log('todos successfully added: ', res);
  } catch (error) {
    console.log('todo not created: ', error);
  } finally {
    await client.end();
  }
}

async function getTodos(id: number) {
  await client.connect();

  try {
    const query = `
            SELECT users.id, users.username, users.email, todos.title, todos.description, todos.completed
            FROM users
            JOIN todos ON users.id = todos.user_id
            WHERE users.id = $1
        `;

    const result = await client.query(query, [id]);

    if (result.rows.length > 0) {
      console.log('User and todos found: ', result.rows);
    } else {
      console.log('No user found with the given id');
    }
  } catch (error) {
    console.log("can't get todos: ", error);
  } finally {
    await client.end();
  }
}

// createTable();
// insertData('unknown', 'unknown@example.com', 'hsahedPassword');
// getUser('salman123');\
// updateUser('email@example12.com', 'new_username');
// createTodosTable();
// addTodos(2, 'improve your portfolio', 'add all the projects');

// addTodos(2, 'random random', 'you have entered random random');

addTodos(99, 'three', '3 three threee');
// getTodos(2);
