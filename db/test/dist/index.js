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
const pg_1 = require("pg");
const dotenv_1 = __importDefault(require("dotenv"));
dotenv_1.default.config();
const KEY = process.env.KEY;
const client = new pg_1.Client({
    connectionString: KEY,
});
function insertData(username, email, password) {
    return __awaiter(this, void 0, void 0, function* () {
        yield client.connect();
        try {
            const insertQuesry = `
    INSERT INTO users(username, email, password) 
    VALUES($1, $2, $3);
    `;
            const values = [username, email, password];
            const res = yield client.query(insertQuesry, values);
            console.log(`Insertion succes: ${JSON.stringify(res)}`);
        }
        catch (error) {
            console.log(error);
        }
    });
}
function getUser(username) {
    return __awaiter(this, void 0, void 0, function* () {
        yield client.connect();
        const query = `
    SELECT * FROM users WHERE username= $1
  `;
        const values = [username];
        const res = yield client.query(query, values);
        if (res.rows.length > 0) {
            console.log('User found', res.rows[0]);
            return res.rows[0];
        }
        else {
            console.log('No user found with the username: ', username);
        }
        try {
        }
        catch (error) {
            console.log('error: ', error);
        }
        finally {
            yield client.end();
        }
    });
}
function createUserTable() {
    return __awaiter(this, void 0, void 0, function* () {
        yield client.connect();
        try {
            const result = yield client.query(`
        CREATE TABLE admin(
            id SERIAL PRIMARY KEY,
            username VARCHAR(50) UNIQUE NOT NULL,
            email VARCHAR(255) UNIQUE NOT NULL,
            password VARCHAR(255) NOT NULL,
            created_at TIMESTAMP WITH TIME ZONE DEFAULT CURRENT_TIMESTAMP
        )
        `);
            console.log(result);
        }
        catch (error) {
            console.log(`error: ${error}`);
        }
    });
}
function updateUser(email, username) {
    return __awaiter(this, void 0, void 0, function* () {
        yield client.connect();
        try {
            const query = `
    UPDATE users
    SET username = $2
    WHERE email = $1
    `;
            const values = [email, username];
            const res = yield client.query(query, values);
            if (res.rowCount === 0) {
                console.log('no user found with the email: ', email);
                console.log(res);
            }
            else {
                console.log('user updated successfully');
                console.log(res);
            }
        }
        catch (error) {
            console.log('something went wrong while updating user: ', error);
        }
        finally {
            yield client.end();
        }
    });
}
function createTodosTable() {
    return __awaiter(this, void 0, void 0, function* () {
        yield client.connect();
        try {
            const res = yield client.query(`
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
        }
        catch (error) {
            console.log('something went wrong while creating todos table', error);
        }
        finally {
            yield client.end();
        }
    });
}
function addTodos(id, title, description) {
    return __awaiter(this, void 0, void 0, function* () {
        yield client.connect();
        try {
            const query = `
        INSERT INTO todos(user_id, title, description)
        VALUES($1, $2, $3)
    `;
            const values = [id, title, description];
            const res = yield client.query(query, values);
            console.log('todos successfully added: ', res);
        }
        catch (error) {
            console.log('todo not created: ', error);
        }
        finally {
            yield client.end();
        }
    });
}
function getTodos(id) {
    return __awaiter(this, void 0, void 0, function* () {
        yield client.connect();
        try {
            const query = `
            SELECT users.id, users.username, users.email, todos.title, todos.description, todos.completed
            FROM users
            JOIN todos ON users.id = todos.user_id
            WHERE users.id = $1
        `;
            const result = yield client.query(query, [id]);
            if (result.rows.length > 0) {
                console.log('User and todos found: ', result.rows);
            }
            else {
                console.log('No user found with the given id');
            }
        }
        catch (error) {
            console.log("can't get todos: ", error);
        }
        finally {
            yield client.end();
        }
    });
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
