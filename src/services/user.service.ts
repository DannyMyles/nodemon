import User from '../db/entities/userEntity';
import { UserModel } from '../core/models/userModel';
import { NextFunction } from 'express';

export default class UserService {
  public async createUser(
    data: Omit<UserModel, 'id'>,
    next: NextFunction,
  ): Promise<User | void> {
    try {
      const newUser = await User.create({
        roleId: data.roleId,
        fullname: data.fullname,
        lastname: data.lastname,
        email: data.email,
        birthdate: data.birthdate,
        gender: data.gender,
        username: data.username,
        password: data.password,
      });
      return this.findUserByUsername(newUser.username, next);
    } catch (err) {
      return next(err);
    }
  }

  public async findUserByUsername(
    username: string,
    next: NextFunction,
  ): Promise<User | void> {
    try {
      return User.findOne({
        where: { username },
        include: ['role'],
      });
    } catch (err) {
      return next(err);
    }
  }

  public async update(
    id: number,
    data: Partial<UserModel>,
    next: NextFunction,
  ): Promise<User | void> {
    try {
      await User.update(
        {
          ...data,
        },
        {
          where: { id },
        },
      );
      return User.findByPk(id);
    } catch (err) {
      return next(err);
    }
  }

  public async getAll(next: NextFunction): Promise<User[] | void> {
    try {
      return User.findAll({
        include: ['role'],
      });
    } catch (err) {
      return next(err);
    }
  }

  public async findById(id: number, next: NextFunction): Promise<User | void> {
    try {
      return User.findByPk(id, {
        include: ['role'],
      });
    } catch (err) {
      return next(err);
    }
  }

  public async delete(id: number, next: NextFunction): Promise<User | void> {
    try {
      const user = await User.findByPk(id);
      await User.destroy({
        where: {
          id,
        },
      });
      return user;
    } catch (err) {
      return next(err);
    }
  }
}
