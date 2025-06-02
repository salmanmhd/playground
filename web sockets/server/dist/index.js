"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
const express_1 = __importDefault(require("express"));
const ws_1 = require("ws");
const app = (0, express_1.default)();
const server = app.listen(8000);
const wss = new ws_1.WebSocketServer({ server });
wss.on("connection", (ws) => {
    ws.on("error", console.error);
    ws.on("message", (data) => {
        wss.clients.forEach((client) => {
            if (client.readyState === WebSocket.OPEN) {
                client.send(data, { binary: false });
            }
        });
    });
    ws.send("Hello, from server");
});
