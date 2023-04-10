import jwt from 'jsonwebtoken';
import { ROLE_TYPES } from '../utils/constants';
import { IToken } from '../core/models/tokenModel';
import { NextFunction } from 'express';
import dotenv from 'dotenv';
dotenv.config();

export default class JwtService {
  public generateAccessToken(
    id: number,
    username: string,
    role: ROLE_TYPES,
    email: string,
  ): string {
    return jwt.sign(
      {
        id: id,
        username: username,
        role: role,
        email: email,
      },
      process.env.JWT_SECRET,
      {
        expiresIn: '30min',
      },
    );
  }
  public verifyToken(token: string, next: NextFunction): IToken | void {
    try {
      return jwt.verify(token, process.env.JWT_SECRET);
    } catch (err) {
      return next(err);
    }
  }
}
