import { Hono } from 'hono';
import { userController } from './controller/user-controller';

const app = new Hono();

app.get('/', (c) => {
  return c.text('Hello Hono!');
});

app.route('/', userController);

export default app;
