import { NextFunction, Request, Response } from 'express';
import RoleService from '../services/role.service';
import { ApiResponse } from '../core/models/responseModel';

const roleService = new RoleService();

export default class RoleController {
  public async createRole(
    req: Request,
    res: Response,
    next: NextFunction,
  ): Promise<Response | void> {
    try {
      const role = await roleService.createRole(req.body, next);
      return res
        .status(201)
        .send(new ApiResponse(201, role, 'Role created successfully!', false));
    } catch (err) {
      return next(err);
    }
  }

  public async getAll(
    _req: Request,
    res: Response,
    next: NextFunction,
  ): Promise<Response | void> {
    try {
      const roles = await roleService.getAll(next);
      return res
        .status(200)
        .send(new ApiResponse(200, roles, 'Got all roles', false));
    } catch (err) {
      return next(err);
    }
  }

  public async getRoleById(
    req: Request,
    res: Response,
    next: NextFunction,
  ): Promise<Response | void> {
    try {
      const { id } = req.params;
      const role = await roleService.getRoleById(Number(id), next);
      return res
        .status(200)
        .send(new ApiResponse(200, role, 'Got the role', false));
    } catch (err) {
      return next(err);
    }
  }
}
