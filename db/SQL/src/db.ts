import dotenv from 'dotenv';
import { Client } from 'pg';
dotenv.config();

const KEY = process.env.URI;
const client = new Client({
  connectionString: KEY,
});

async function createTables() {
  await client.connect();

  try {
    const createUsersQuery = `
        CREATE TABLE IF NOT EXISTS users(
            id SERIAL PRIMARY KEY,
            username VARCHAR(255) UNIQUE NOT NULL,
            email VARCHAR(255) UNIQUE NOT NULL,
            password VARCHAR(255) NOT NULL,
            created_at TIMESTAMP WITH TIME ZONE DEFAULT CURRENT_TIMESTAMP

        )`;

    await client.query(createUsersQuery);
    console.log('tables created successfully');
  } catch (error) {
    console.log(`something went wrong while creating tables`, error);
  } finally {
    await client.end();
  }
}

export { createTables, client };
