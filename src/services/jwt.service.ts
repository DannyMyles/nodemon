import jwt from 'jsonwebtoken';
import { ROLE_TYPES } from '../utils/constants';
import { IToken } from '../core/models/tokenModel';

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
                expiresIn: process.env.EXP_TIME,
            },
        );
    }
    public verifyToken(token: string): IToken {
        try {
            return jwt.verify(token, process.env.JWT_SECRET);
        } catch (err) {
            return null;
        }
    }
}
