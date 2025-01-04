import { RegisterUserRequest, toUserResponse, UserResponse } from '../model/user-model';
import { UserValidation } from '../validation/user-validation';
import { prismaClient } from '../application/database';
import { HTTPException } from 'hono/http-exception';

export class UserService {
  static async register(request: RegisterUserRequest): Promise<UserResponse> {
    // validasi req
    request = UserValidation.REGISTER.parse(request);

    // cek apakah ada di database atau tidak
    const totalUserWithSameUsername = prismaClient.user.count({
      where: {
        username: request.username,
      },
    });

    if (totalUserWithSameUsername > 0) {
      throw new HTTPException(400, {
        message: 'Username already exists',
      });
    }

    // hashing password menggunakan bycript
    request.password = Bun.password.hash(request.password, {
      algorithm: 'bcrypt',
      cost: 10,
    });

    // save ke database
    const user = await prismaClient.user.create({
      data: request,
    });

    // return response
    return toUserResponse(user);
  }
}
