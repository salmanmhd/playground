"use strict";
// USING POSTGRES : DIRECT QUERIES
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
const express_1 = __importDefault(require("express"));
const db_1 = require("./db");
const pg_1 = require("pg");
const dotenv_1 = __importDefault(require("dotenv"));
const cors_1 = __importDefault(require("cors"));
dotenv_1.default.config();
const KEY = process.env.KEY;
const app = (0, express_1.default)();
app.use(express_1.default.json());
app.use((0, cors_1.default)());
(() => __awaiter(void 0, void 0, void 0, function* () {
    yield (0, db_1.createTables)();
    console.log('Database setup complete!');
}))();
const getClient = () => {
    return new pg_1.Client({
        connectionString: KEY,
    });
};
app.get('/', (req, res) => __awaiter(void 0, void 0, void 0, function* () {
    res.send('running up and fine');
}));
app.get('/user', (req, res) => __awaiter(void 0, void 0, void 0, function* () {
    const { email } = req.body;
    const client = getClient();
    yield client.connect();
    try {
        const query = `
  SELECT * FROM users
  where email = $1
  `;
        const values = [email];
        const result = yield client.query(query, values);
        if (result.rows.length > 0) {
            res.status(200).json({
                msg: 'user fetched successfully',
                user: result.rows[0],
            });
        }
    }
    catch (error) {
        res.status(400).json({
            msg: 'something went wrong',
            error,
        });
    }
    finally {
        yield client.end();
    }
}));
app.post('/user', (req, res) => __awaiter(void 0, void 0, void 0, function* () {
    const { username, email, password } = req.body;
    const client = getClient();
    yield client.connect();
    try {
        const query = `
    INSERT INTO users(username, email, password)
    VALUES($1, $2, $3)
    RETURNING username, email, id
    `;
        const values = [username, email, password];
        const result = yield client.query(query, values);
        if (result.rowCount && result.rowCount > 0) {
            res.status(200).json({
                msg: 'user added successfully',
                user: result.rows[0],
            });
        }
        else {
            console.log('something went wrong while creating users');
            console.log(result);
        }
    }
    catch (error) {
        res.status(400).json({
            msg: 'something went wrong while creating users',
            error,
        });
    }
    finally {
        yield client.end();
    }
}));
app.get('/todo/:id', (req, res) => __awaiter(void 0, void 0, void 0, function* () {
    const { id } = req.params;
    const client = getClient();
    yield client.connect();
    try {
        const query = `
    SELECT * FROM todo
    WHERE id= $1
    `;
        const values = [id];
        const result = yield client.query(query, values);
        if (result.rows.length > 0) {
            res.status(200).json({
                msg: 'todos fetched successfully',
                todos: result.rows[0],
            });
        }
    }
    catch (error) {
        res.status(400).json({
            msg: "can't get todo by id",
            error,
        });
    }
    finally {
        yield client.end();
    }
}));
app.get('/todo/:user_id', (req, res) => __awaiter(void 0, void 0, void 0, function* () {
    const { user_id } = req.params;
    const client = getClient();
    yield client.connect();
    try {
        const query = `
    SELECT * FROM todos
    WHERE user_id = $1
    `;
        const result = yield client.query(query, [user_id]);
        if (result.rows.length > 0) {
            res.status(200).json({
                msg: 'todos fetched successfully',
                todos: result.rows,
            });
        }
    }
    catch (error) {
        res.status(400).json({
            msg: "can't get todo by id",
            error,
        });
    }
    finally {
        yield client.end();
    }
}));
app.post('/todo', (req, res) => __awaiter(void 0, void 0, void 0, function* () {
    const { title, description, user_id } = req.body;
    const client = getClient();
    yield client.connect();
    try {
        const query = `
        INSERT INTO todos(title, description, user_id)
        VALUES($1,$2,$3)
    `;
        const values = [title, description, user_id];
        const result = yield client.query(query, values);
        if (result.rowCount && result.rowCount > 0) {
            res.status(200).json({
                msg: 'todo added successfully',
            });
        }
    }
    catch (error) {
        res.status(400).json({
            msg: "can't get todo by id",
            error,
        });
    }
    finally {
        yield client.end();
    }
}));
app.put('/todo/:id', (req, res) => __awaiter(void 0, void 0, void 0, function* () {
    const { id } = req.params;
    const client = getClient();
    yield client.connect();
    try {
        const query = `
    UPDATE todos
    SET completed = NOT completed
    WHERE id=$1
    RETURNING *;
    `;
        const result = yield client.query(query, [id]);
        if (result.rows.length > 0) {
            res.status(200).json({
                msg: 'todo updated',
                todos: result.rows[0],
            });
        }
        else {
            res.status(200).json({
                msg: `no todo found with id: ${id}`,
            });
        }
    }
    catch (error) {
        res.status(400).json({
            msg: "can't get todo by id",
            error,
        });
    }
    finally {
        yield client.end();
    }
}));
app.delete('/todo/:id', (req, res) => __awaiter(void 0, void 0, void 0, function* () {
    const { id } = req.params;
    const client = getClient();
    yield client.connect();
    try {
        const query = `
    DELETE FROM todos
    WHERE id = $1
    `;
        const result = yield client.query(query, [id]);
        if (result.rowCount && result.rowCount > 0) {
            res.status(200).json({
                msg: 'Todos deleted successfully',
            });
        }
        else {
            res.status(400).json({
                msg: `no todos found with id: ${id}`,
            });
            console.log(`no todos found with id: ${id}`);
        }
    }
    catch (error) {
        res.status(400).json({
            msg: "can't get todo by id",
            error,
        });
    }
    finally {
        yield client.end();
    }
}));
app.listen(3000, () => {
    console.log(`server running on 3000`);
});
