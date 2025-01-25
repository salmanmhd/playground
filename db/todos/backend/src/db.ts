import { Client } from 'pg';

import dotenv from 'dotenv';
dotenv.config();

const KEY = process.env.KEY;
console.log(KEY);
const client = new Client({
  connectionString: KEY,
});

async function createTables() {
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
      description VARCHAR(255) UNIQUE NOT NULL,
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
}

export { createTables, client };
// export default client;
