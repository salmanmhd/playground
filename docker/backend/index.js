import express from 'express';

const app = express();

console.log(process.env.ALG);

app.get('/', (req, res) => {
  res.send('Hello world from backend');
});

app.get('/about', (req, res) => {
  res.send('this is about page');
});

app.get('/about12', (req, res) => {
  res.send('this is about page12');
});

app.listen(3000, () => {
  console.log('listening on port 3000');
});
