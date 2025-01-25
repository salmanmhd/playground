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
const express_1 = __importDefault(require("express"));
const db_1 = require("./db");
const app = (0, express_1.default)();
app.use(express_1.default.json());
(() => __awaiter(void 0, void 0, void 0, function* () {
    yield (0, db_1.createTables)();
    console.log('Database setup complete!');
}))();
app.get('/user-all', (req, res) => __awaiter(void 0, void 0, void 0, function* () {
    res.send('hi there');
}));
app.get('/user', (req, res) => __awaiter(void 0, void 0, void 0, function* () {
    const { email } = req.body;
    yield db_1.client.connect();
    try {
        const query = `
  SELECT * FROM users
  where email = $1
  `;
        const values = [email];
        const result = yield db_1.client.query(query, values);
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
        yield db_1.client.end();
    }
}));
app.post('/user', (req, res) => __awaiter(void 0, void 0, void 0, function* () { }));
app.get('/todo/:id', (req, res) => __awaiter(void 0, void 0, void 0, function* () {
    const { id } = req.params;
    yield db_1.client.connect();
    try {
        const query = `
    SELECT * FROM todo
    WHERE id= $1
    `;
        const values = [id];
        const result = yield db_1.client.query(query, values);
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
        yield db_1.client.end();
    }
}));
app.get('/todo', (req, res) => __awaiter(void 0, void 0, void 0, function* () {
    const { user_id } = req.body;
    yield db_1.client.connect();
    try {
        const query = `
    SELECT * FROM todos
    WHERE user_id = $1
    `;
        const result = yield db_1.client.query(query, [user_id]);
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
        yield db_1.client.end();
    }
}));
app.post('/todo', (req, res) => __awaiter(void 0, void 0, void 0, function* () {
    const { title, description, user_id } = req.body;
    yield db_1.client.connect();
    try {
        const query = `
        INSERT INTO todos(title, description, user_id)
        VALUES($1,$2,$3)
    `;
        const values = [title, description, user_id];
        const result = yield db_1.client.query(query, values);
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
        yield db_1.client.end();
    }
}));
app.put('/todo/:id', (req, res) => __awaiter(void 0, void 0, void 0, function* () {
    const { id } = req.params;
    yield db_1.client.connect();
    try {
        const query = `
    UPDATE todos
    SET completed = NOT completed
    WHERE id=$1
    RETURNING *;
    `;
        const result = yield db_1.client.query(query, [id]);
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
        yield db_1.client.end();
    }
}));
app.delete('/todo/:id', (req, res) => __awaiter(void 0, void 0, void 0, function* () {
    const { id } = req.params;
    yield db_1.client.connect();
    try {
        const query = `
    DELETE FROM todos
    WHERE id = $1
    `;
        const result = yield db_1.client.query(query, [id]);
        if (result.rowCount && result.rowCount > 0) {
            res.status(200).json({
                msg: 'Todos fetched successfully',
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
        yield db_1.client.end();
    }
}));
app.listen(3000, () => {
    console.log(`server running on 3000`);
});
