import express from "express";
import dotenv from "dotenv";
dotenv.config();

const app = express();

const AppName = process.env.my_app;

app.get("/", (req, res) => {
  console.log(`request served by ${AppName}`);
  res.send("Hello World!");
});

app.get("/about", (req, res) => {
  res.send("About Page");
});

app.post("/contact", (req, res) => {
  res.send("Contact Page");
});

app.listen(3000, () => {
  console.log(`${AppName} is running on port 3000`);
});
