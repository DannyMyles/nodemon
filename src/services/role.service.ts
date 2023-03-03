import Role from '../db/entities/roleEntity';
import { RoleModel } from '../core/models/roleModel';
import { ROLE_TYPES } from '../utils/constants';
import { NextFunction } from 'express';

export default class RoleService {
  public async createRole(
    data: Omit<RoleModel, 'roleId'>,
    next: NextFunction,
  ): Promise<Role | void> {
    try {
      return Role.create({
        role: data.role,
      });
    } catch (err) {
      return next(err);
    }
  }

  public async getAll(next): Promise<Role[] | void> {
    try {
      return Role.findAll();
    } catch (err) {
      return next(err);
    }
  }

  public async getRoleById(
    roleId: number,
    next: NextFunction,
  ): Promise<Role | void> {
    try {
      return Role.findByPk(roleId);
    } catch (err) {
      return next(err);
    }
  }

  // Getting role by role
  public async getOneRole(
    role: ROLE_TYPES,
    next: NextFunction,
  ): Promise<Role | void> {
    try {
      return Role.findOne({
        where: { role },
      });
    } catch (err) {
      return next(err);
    }
  }

  // If returns 0 then nothing is updated, else returns 1.
  public async incrementRoleCount(
    role: ROLE_TYPES,
    next: NextFunction,
  ): Promise<number | void> {
    try {
      const currRole = await this.getOneRole(role, next);
      if (currRole) {
        const updatedCount = await Role.update(
          {
            count: currRole.count + 1,
          },
          {
            where: {
              role: role,
            },
          },
        );
        return updatedCount[0];
      }
    } catch (err) {
      return next(err);
    }
  }

  public async decrementRoleCount(
    role: ROLE_TYPES,
    next: NextFunction,
  ): Promise<number | void> {
    try {
      const currRole = await this.getOneRole(role, next);
      if (currRole) {
        const updatedCount = await Role.update(
          {
            count: currRole.count - 1,
          },
          {
            where: {
              role: role,
            },
          },
        );
        return updatedCount[0];
      }
    } catch (err) {
      return next(err);
    }
  }
}
