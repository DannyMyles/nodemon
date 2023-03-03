import { NextFunction, Request, Response } from 'express';
import JwtService from '../../services/jwt.service';
import { ApiResponse } from '../models/responseModel';

const jwtService = new JwtService();

export async function verifyUser(
  req: Request,
  res: Response,
  next: NextFunction,
): Promise<NextFunction | ApiResponse | void> {
  try {
    const authHeader = req.header('authorization');

    if (!authHeader) {
      return ApiResponse.generateBearerInvalidErrorResponse();
    }

    const bearer = authHeader.split(' ');

    if (
      bearer[0].toLowerCase() !== 'bearer' ||
      typeof bearer[1] === 'undefined'
    ) {
      return ApiResponse.generateBearerInvalidErrorResponse();
    }
    const accessToken = bearer[1];

    if (!accessToken) {
      return ApiResponse.generateNotAuthorizedErrorResponse();
    }
    const user = jwtService.verifyToken(accessToken, next);

    if (!user) {
      return ApiResponse.generateNotAuthorizedErrorResponse();
    }
    res.locals.user = user;
    return next();
  } catch (err) {
    return next(err);
  }
}
