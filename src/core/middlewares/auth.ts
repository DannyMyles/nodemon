import { NextFunction, Request, Response } from 'express';
import JwtService from '../../services/jwt.service';

const jwtService = new JwtService();

export async function verifyUser(
    req: Request,
    res: Response,
    next: NextFunction,
): Promise<NextFunction | Response | void> {
    try {
        const authHeader = req.header('authorization');

        if (!authHeader) {
            return res.status(401).send({
                code: 401,
                message: "Unauthorized!!! Auth Header doesn't exist!",
            });
        }

        const bearer = authHeader.split(' ');

        if (
            bearer[0].toLowerCase() !== 'bearer' ||
            typeof bearer[1] === 'undefined'
        ) {
            return res.status(401).send({
                code: 401,
                message: 'Unauthorized!!! Invalid Bearer token!',
            });
        }
        const accessToken = bearer[1];

        if (!accessToken) {
            return res.status(403).send({
                code: 401,
                message: 'Forbidden!!!',
            });
        }
        const user = jwtService.verifyToken(accessToken);

        if (!user) {
            return res.status(401).send({
                code: 401,
                message: 'Unauthorized!!! Invalid User!',
            });
        }
        res.locals.user = user;
        return next();
    } catch (err) {
        return res.sendStatus(500);
    }
}
