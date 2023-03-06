import { NextFunction, Request, Response } from 'express';
import { ApiResponse } from '../core/models/responseModel';
import { UserModel } from '../core/models/userModel';
import RoleService from '../services/role.service';
import UserService from '../services/user.service';
import { isSubarray } from '../utils/helpers';

const userService = new UserService();
const roleService = new RoleService();

export default class UserController {
  public async getAll(
    _req: Request,
    res: Response,
    next: NextFunction,
  ): Promise<Response | void> {
    try {
      const users = await userService.getAll(next);
      if (users && users.length) {
        const data = users.map(
          (user) =>
            new UserModel(
              user.id,
              user.fullname,
              user.lastname,
              user.email,
              user.birthdate,
              user.gender,
              user.username,
              '',
              '',
              0,
              user['role'],
            ),
        );
        return res
          .status(200)
          .send(new ApiResponse(200, data, 'Got all users.', false));
      }
    } catch (err) {
      return next(err);
    }
  }

  public async update(
    req: Request,
    res: Response,
    next: NextFunction,
  ): Promise<Response | void> {
    try {
      const id = Number(req.params.id);
      const { user } = req.body;

      if (
        !(
          id &&
          isSubarray(Object.keys(UserModel), Object.keys(user)) &&
          Object.keys(user).length
        )
      ) {
        return res
          .status(400)
          .send(ApiResponse.generateBadRequestErrorResponse());
      }

      const isUser = await userService.findById(id, next);

      if (!isUser) {
        return res
          .status(404)
          .send(ApiResponse.generateNotFoundErrorResponse('User'));
      }

      const data = await userService.update(id, user, next);
      return res
        .status(200)
        .send(new ApiResponse(200, data, 'User updated successfully', false));
    } catch (err) {
      return next(err);
    }
  }

  public async delete(
    req: Request,
    res: Response,
    next: NextFunction,
  ): Promise<Response | void> {
    try {
      const id = Number(req.params.id);

      if (!id) {
        return res
          .status(400)
          .send(ApiResponse.generateBadRequestErrorResponse());
      }

      const isUser = await userService.findById(id, next);
      if (!isUser) {
        return res
          .status(404)
          .send(ApiResponse.generateNotFoundErrorResponse('User'));
      }

      await roleService.decrementRoleCount(isUser['role'], next);

      const deletedUser = await userService.delete(id, next);
      return res
        .status(200)
        .send(
          new ApiResponse(200, deletedUser, 'User deleted successfully', false),
        );
    } catch (err) {
      return next(err);
    }
  }

  public async get(
    req: Request,
    res: Response,
    next: NextFunction,
  ): Promise<Response | void> {
    try {
      const id = Number(req.params.id);

      if (!id) {
        return res
          .status(400)
          .send(ApiResponse.generateBadRequestErrorResponse());
      }

      const user = await userService.findById(id, next);

      if (!user) {
        return res
          .status(404)
          .send(ApiResponse.generateNotFoundErrorResponse('User'));
      }
      return res
        .status(200)
        .send(new ApiResponse(200, user, 'Got user', false));
    } catch (err) {
      return next(err);
    }
  }
}
