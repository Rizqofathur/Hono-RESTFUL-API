import { LoginUserRequest, RegisterUserRequest, toUserResponse, UserResponse } from '../model/user-model';
import { UserValidation } from '../validation/user-validation';
import { prismaClient } from '../application/database';
import { HTTPException } from 'hono/http-exception';

export class UserService {
  static async register(request: RegisterUserRequest): Promise<UserResponse> {
    // validasi req
    request = UserValidation.REGISTER.parse(request);

    // cek apakah ada di database atau tidak
    const totalUserWithSameUsername = await prismaClient.user.count({
      where: {
        username: request.username,
      },
    });

    if (totalUserWithSameUsername != 0) {
      throw new HTTPException(400, {
        message: 'Username already exists',
      });
    }

    // hashing password menggunakan bycript
    request.password = await Bun.password.hash(request.password, {
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

  static async login(request: LoginUserRequest): Promise<UserResponse> {
    // validasi req
    request = UserValidation.LOGIN.parse(request);

    // cek adakah di database
    let user = await prismaClient.user.findUnique({
      where: {
        username: request.username,
      },
    });

    // jika user tidak ditemukan
    if (!user) {
      throw new HTTPException(401, {
        message: 'username or password is invalid!',
      });
    }

    // cek apakah password valid
    const isPasswordValid = await Bun.password.verify(request.password, user.password, 'bcrypt');
    if (!isPasswordValid) {
      throw new HTTPException(401, {
        message: 'username or password is invalid!',
      });
    }

    // menambah token ke user
    user = await prismaClient.user.update({
      where: {
        username: user.username,
      },
      data: {
        token: crypto.randomUUID(),
      },
    });

    const response = toUserResponse(user);
    response.token = user.token!;

    return response;
  }
}
