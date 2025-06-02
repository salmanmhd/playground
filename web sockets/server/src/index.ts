import express from "express";
import { WebSocketServer } from "ws";

const app = express();

const server = app.listen(8000);

const wss = new WebSocketServer({ server });

wss.on("connection", (ws) => {
  ws.on("error", console.error);

  ws.on("message", (data) => {
    wss.clients.forEach((client) => {
      if (client.readyState === WebSocket.OPEN) {
        client.send(data);
      }
    });
  });

  ws.send("Hello, from server");
});
