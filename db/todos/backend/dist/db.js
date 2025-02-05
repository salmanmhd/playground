"use strict";
var __awaiter = (this && this.__awaiter) || function (thisArg, _arguments, P, generator) {
    function adopt(value) { return value instanceof P ? value : new P(function (resolve) { resolve(value); }); }
    return new (P || (P = Promise))(function (resolve, reject) {
        function fulfilled(value) { try { step(generator.next(value)); } catch (e) { reject(e); } }
        function rejected(value) { try { step(generator["throw"](value)); } catch (e) { reject(e); } }
        function step(result) { result.done ? resolve(result.value) : adopt(result.value).then(fulfilled, rejected); }
        step((generator = generator.apply(thisArg, _arguments || [])).next());
    });
};
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
exports.client = void 0;
exports.createTables = createTables;
const pg_1 = require("pg");
const dotenv_1 = __importDefault(require("dotenv"));
dotenv_1.default.config();
const KEY = process.env.KEY;
console.log(KEY);
const client = new pg_1.Client({
    connectionString: KEY,
});
exports.client = client;
function createTables() {
    return __awaiter(this, void 0, void 0, function* () {
        yield client.connect();
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
            yield client.query(createUsersQuery);
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
            yield client.query(createTodosQuery);
            console.log('Tables created successfully');
        }
        catch (error) {
            console.log('something went wrong while creating  table: ', error);
        }
        finally {
            yield client.end();
        }
    });
}
// export default client;
