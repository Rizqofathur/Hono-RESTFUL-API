import { Hono } from 'hono';
import { RegisterUserRequest } from '../model/user-model';
import { UserService } from '../service/user-service';

export const userController = new Hono();

userController.post('/api/users', async (c) => {
  // ambil request
  const request = (await c.req.json()) as RegisterUserRequest;

  // kirim ke service
  const response = await UserService.register(request);

  // return response
  return c.json({
    data: response,
  });
});
