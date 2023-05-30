import { NextFunction, Request, Response } from 'express';
import UserService from '../services/user.service';
import JwtService from '../services/jwt.service';
import { UserModel } from '../core/models/userModel';
import RoleService from '../services/role.service';
import { ROLE_TYPES } from '../utils/constants';
import { ApiResponse } from '../core/models/responseModel';

const roleService = new RoleService();
const jwtService = new JwtService();
const userService = new UserService();

export default class AuthController {
  public async login(
    req: Request,
    res: Response,
    next: NextFunction,
  ): Promise<Response | void> {
    try {
      const { username, password } = req.body;
      if (!(username && password)) {
        return res
          .status(400)
          .send(ApiResponse.generateBadRequestErrorResponse());
      }
      const user = await userService.findUserByUsername(username, next);

      if (user) {
        const isPasswordMatch = user.validatePassword(password);

        if (!isPasswordMatch) {
          return res
            .status(403)
            .send(ApiResponse.generateLoginInvalidErrorResponse());
        } else {
          const accessToken = jwtService.generateAccessToken(
            user.id,
            user.username,
            user['role'].role,
            user.password,
          );
          const data = new UserModel(
            user.id,
            user.fullname,
            user.lastname,
            user.email,
            user.birthdate,
            user.gender,
            user.username,
            user.password,
            accessToken,
            user.roleId,
            user['role'].role,
          );
          delete data.password;
          delete data.roleId;
          return res
            .status(200)
            .send(
              new ApiResponse(200, data, 'User logged in successfully!', false),
            );
        }
      } else {
        return res
          .status(404)
          .send(ApiResponse.generateNotFoundErrorResponse('User'));
      }
    } catch (err) {
      return next(err);
    }
  }

  public async signup(
    req: Request,
    res: Response,
    next: NextFunction,
  ): Promise<Response | void> {
    try {
      const {
        fullname,
        lastname,
        email,
        birthdate,
        gender,
        username,
        password,
      } = req.body;
      const role = req.body.role ? req.body.role : ROLE_TYPES.USER;

      if (
        !(
          fullname &&
          lastname &&
          email &&
          birthdate &&
          gender &&
          username &&
          password
        )
      ) {
        return res
          .status(400)
          .send(ApiResponse.generateBadRequestErrorResponse());
      }

      const userExists = await userService.findUserByUsername(username, next);
      if (userExists) {
        return res
          .status(409)
          .send(ApiResponse.generateDuplicationErrorResponse());
      }

      const userRole = await roleService.getOneRole(role, next);
      if (!userRole) {
        return res
          .status(404)
          .send(ApiResponse.generateNotFoundErrorResponse('Role'));
      }
      if (userRole.role === ROLE_TYPES.ADMIN && userRole.count > 1) {
        return res
          .status(400)
          .send(ApiResponse.generateBadRequestErrorResponse());
      }

      req.body.roleId = userRole.roleId;
      const user = await userService.createUser(req.body, next);
      if (user) {
        const accessToken = jwtService.generateAccessToken(
          user.id,
          user.username,
          user['role'].role,
          user.email,
        );
        const data = new UserModel(
          user.id,
          user.fullname,
          user.lastname,
          user.email,
          user.birthdate,
          user.gender,
          user.username,
          user.password,
          accessToken,
          user.roleId,
          user['role'].role,
        );
        delete data.password;
        delete data.roleId;

        await roleService.incrementRoleCount(role, next);
        return res
          .status(201)
          .send(
            new ApiResponse(201, data, 'User created successfully!', false),
          );
      }
    } catch (err) {
      return next(err);
    }
  }
}
