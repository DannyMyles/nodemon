import { NextFunction, Request, Response } from 'express';
import RoleService from '../services/role.service';
import { ApiResponse } from '../core/models/responseModel';

const roleService = new RoleService();

export default class RoleController {
  public async createRole(
    req: Request,
    _res: Response,
    next: NextFunction,
  ): Promise<ApiResponse | void> {
    try {
      const role = await roleService.createRole(req.body, next);
      return new ApiResponse(201, role, 'Role created successfully!', false);
    } catch (err) {
      return next(err);
    }
  }

  public async getAll(
    req: Request,
    _res: Response,
    next: NextFunction,
  ): Promise<ApiResponse | void> {
    try {
      const roles = await roleService.getAll(next);
      return new ApiResponse(200, roles, 'Got all roles', false);
    } catch (err) {
      return next(err);
    }
  }

  public async getRoleById(
    req: Request,
    _res: Response,
    next: NextFunction,
  ): Promise<ApiResponse | void> {
    try {
      const { id } = req.params;
      const role = await roleService.getRoleById(Number(id), next);
      return new ApiResponse(200, role, 'Got the role', false);
    } catch (err) {
      return next(err);
    }
  }
}
