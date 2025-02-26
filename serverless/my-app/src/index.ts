import { Hono } from 'hono';

const app = new Hono();

async function authMiddleware(c: any, next: any) {
  if (c.req.header('Authorization')) {
    await next();
  }
  return c.text('You are not authorized');
}

app.post('/', async (c) => {
  const { req, res } = c;
  const body = await req.json();
  console.log(body);
  console.log(req.header('Test'));
  console.log(req.query('a'));
  return c.text('Hello how are you doing?');
});

export default app;
